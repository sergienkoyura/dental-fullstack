import React, {useEffect, useState} from "react";
import authService from "../../../../services/auth.service";
import userService from "../../../../services/user.service";
import {SpinnerLoading} from "../../../utils/SpinnerLoading";
import UserDTO from "../../../../models/UserDTO";
import PasswordRequest from "../../../../models/PasswordRequest";
import Verification from "../../../utils/Verification";

const ManageAccount = () => {

    const user = authService.getCurrentUser();

    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const [fullName, setFullName] = useState('');
    const [verified, setVerified] = useState(true);
    const [messageAccount, setMessageAccount] = useState("");
    const [submittingAccount, setSubmittingAccount] = useState(false);
    const [alertAccountStyle, setAlertAccountStyle] = useState("alert-info");

    const [messagePassword, setMessagePassword] = useState("");
    const [submittingPassword, setSubmittingPassword] = useState(false);
    const [alertPasswordStyle, setAlertPasswordStyle] = useState("alert-info");

    const [saved, setSaved] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchUser = async () => {
            try {
                const rs = await userService.getUserData();
                setFullName(rs.data.fullName);
                setVerified(rs.data.verified)
            } catch (error: any) {
                setHttpError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, [saved]);

    const handleDataUpdates = (event: any) => {
        event.preventDefault();
        const newFullName = event.target.fullName.value;

        const userDTO = new UserDTO(0);
        userDTO.fullName = newFullName;
        
        if(!newFullName || newFullName && (newFullName.length < 5 || newFullName.length > 50)){
            setMessageAccount("Full name must be between 5 and 50 characters!");
            setAlertAccountStyle("alert-danger");
            return;
        }

        if(!/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(newFullName) || newFullName.includes("  ")){
            setMessageAccount("Full name is invalid!");
            setAlertAccountStyle("alert-danger");
            return;
        }

        setSubmittingAccount(true);
        userService.saveAccountData(userDTO)
            .then((res) => {
                setSubmittingAccount(false);
                setMessageAccount("Saved!");
                setAlertAccountStyle("alert-info");

                setFullName(res.data.fullName);
                setSaved(!saved);
            })
            .catch((err) => {
                setMessageAccount(err.message);
                setSubmittingAccount(false);
            });
    };

    const handlePasswordUpdates = (event: any) => {
        event.preventDefault();
        const oldPassword = event.target.oldPassword.value;
        const newPassword = event.target.newPassword.value;
        const confirmPassword = event.target.confirmPassword.value;

        if (newPassword !== confirmPassword) {
            setMessagePassword("Passwords do not match");
            setAlertPasswordStyle("alert-danger");
            return;
        }

        if (oldPassword.length < 6 || oldPassword.length > 64) {
            setMessagePassword("Password must be between 6 and 64 characters");
            setAlertPasswordStyle("alert-danger");
            return;
        }

        if (newPassword.length < 6 || newPassword.length > 64) {
            setMessagePassword("Password must be between 6 and 64 characters");
            setAlertPasswordStyle("alert-danger");
            return;
        }

        const passwordRequest = new PasswordRequest(oldPassword, newPassword);

        setSubmittingPassword(true);
        userService.savePassword(passwordRequest)
            .then((res) => {
                setSubmittingPassword(false);
                setMessagePassword("Saved!");
                setAlertPasswordStyle("alert-info");
                event.target.reset();
            })
            .catch((err) => {
                setMessagePassword(err?.response?.data?.message || "Error occurred");
                setSubmittingPassword(false);
            });
    };

    if (isLoading) {
        return <SpinnerLoading />;
    }

    if (httpError) {
        return (
            <div className="container m-5 text-danger">
                <p>{httpError}</p>
            </div>
        );
    }

    return (
        <div className="container flex-grow-1 d-flex flex-column justify-content-center align-items-center">
            {!verified &&
                <div className="m-5">
                    <Verification />
                </div>
            }
            <div className="col-md-6 col-sm-12">
                <form onSubmit={handleDataUpdates} className="p-3 main-text-dark">
                    <div className="text-center mb-4">
                        <h3 className="fw-semibold">Account information</h3>
                    </div>
                    {messageAccount && (
                        <div className="form-group">
                            <div className={"alert p-1 my-2 " + alertAccountStyle} role="alert">
                                {messageAccount}
                            </div>
                        </div>
                    )}
                    <div className="form-group mb-4">
                        <label htmlFor="fullName">Full name</label>
                        <input
                            id="fullName"
                            type="text"
                            name="fullName"
                            required
                            value={fullName || ""}
                            onChange={(e) => setFullName(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group d-flex justify-content-center">
                        <button type="submit" className="btn btn-md main-button-outline-dark btn-block" disabled={submittingAccount}>
                            {submittingAccount && <span className="spinner-border spinner-border-sm"></span>}
                            <span>Save</span>
                        </button>
                    </div>
                </form>
            </div>

            <div className="col-12">
                <hr className="opacity-100" style={{ color: "#dee2e6" }} />
            </div>


            <div className="col-md-6 col-sm-12">
                <form onSubmit={handlePasswordUpdates} className="p-3 main-text-dark">
                    <div className="text-center mb-4">
                        <h3 className="fw-semibold">Change password</h3>
                    </div>

                    <div className="form-group visually-hidden">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            defaultValue={user?.email || ""}
                            aria-hidden="true"
                            readOnly
                            autoComplete="username"
                        />
                    </div>

                    {messagePassword && (
                        <div className="form-group">
                            <div className={"alert alert-info p-1 my-2 " + alertPasswordStyle} role="alert">
                                {messagePassword}
                            </div>
                        </div>
                    )}
                    <div className="form-group mb-4">
                        <label htmlFor="oldPassword">Old password</label>
                        <input id="oldPassword" type="password" name="oldPassword" className="form-control" autoComplete="current-password" required />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="newPassword">New password</label>
                        <input id="newPassword" type="password" name="newPassword" className="form-control" autoComplete="new-password" required />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="confirmPassword">Repeat password</label>
                        <input id="confirmPassword" type="password" name="confirmPassword" className="form-control" autoComplete="new-password" required />
                    </div>
                    <div className="form-group d-flex justify-content-center">
                        <button type="submit" className="btn btn-md main-button-outline-dark btn-block" disabled={submittingPassword}>
                            {submittingPassword && <span className="spinner-border spinner-border-sm"></span>}
                            <span>Save</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ManageAccount;
