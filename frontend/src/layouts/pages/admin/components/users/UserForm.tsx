import {useEffect, useState} from "react";
import adminService from "../../../../../services/admin.service";
import UserDTO from "../../../../../models/UserDTO";
import RoleEnum from "../../../../../models/RoleEnum";
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, {Dayjs} from "dayjs";

export const UserForm: React.FC<{ itemToEdit: UserDTO, setEdited: any }> = (props) => {

    const [user, setUser] = useState<UserDTO>(props.itemToEdit);
    const [message, setMessage] = useState('');

    const [fromTime, setFromTime] = useState<Dayjs | null>(dayjs("2023-01-01T09:00"));
    const [toTime, setToTime] = useState<Dayjs | null>(dayjs("2023-01-01T18:00"));

    const [submitting, setSubmitting] = useState(false);
    const [alertStyle, setAlertStyle] = useState("alert-info");
    useEffect(() => {
        setUser(props.itemToEdit);
        setMessage("");

        setFromTime(dayjs(`2023-01-01T${props.itemToEdit.fromTime ? props.itemToEdit.fromTime: "09:00"}`))
        setToTime(dayjs(`2023-01-01T${props.itemToEdit.toTime ? props.itemToEdit.toTime: "18:00"}`))

        props.itemToEdit.id === 0 ? window.scrollTo(0, 0) : document.getElementById("userFormId")?.scrollIntoView();
    }, [props.itemToEdit]);

    function saveUser() {
        setSubmitting(true);
        let userToSave: UserDTO = user;
        if (user.role && user.role === 'ROLE_DOCTOR') {
            userToSave.fromTime = fromTime?.format("HH:mm");
            userToSave.toTime = toTime?.format("HH:mm");
        }

        adminService.addUser(userToSave)
            .then((res) => {
                setUser(prev => ({ ...prev, id: res.data.id }))
                setMessage("Saved!");
                setAlertStyle("alert-info");
                props.setEdited(res.data.id);
                window.scrollTo(0, 0)
            })
            .catch((err) => {
                setMessage(err.response?.data?.message || 'An error occurred')
                setAlertStyle("alert-danger");
            })
            .finally(() => {
                setSubmitting(false);
            });
    }

    function roleField(role: string) {
        setUser(prev => ({ ...prev, role: role }))
    }

    async function base64Convertion(e: any) {
        if (e.target.files[0]) {
            getBase64(e.target.files[0]);
        }
    }

    function getBase64(file: any) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setUser(prev => ({ ...prev, image: reader.result?.toString().split(",")[1] }));
        }
        reader.onerror = function (error) {
            console.log('Error', error);
        }
    }

    return (
        <div className="container" id="userFormId">
            <form className="p-3 main-text-dark d-flex justify-content-center align-items-center flex-column">
                <div className="text-center mb-4">
                    <h3 className="fw-semibold">Manage Users</h3>
                </div>


                <div className="col-md-8 col-sm-12 p-2">
                    {message && (
                        <div className="d-flex justify-content-center w-100">
                            <div className={"alert py-1 text-center w-100 " + alertStyle} role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <div className="form-group mb-4">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="text"
                            name="email"
                            value={user.email || ''}
                            onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
                            className="form-control"
                            required
                            placeholder="Email"
                        />
                    </div>

                    <div className="form-group mb-4">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={user.password || ''}
                            onChange={(e) => setUser(prev => ({ ...prev, password: e.target.value }))}
                            className="form-control"
                            required
                            placeholder="Password"
                        />
                    </div>

                    <div className="form-group mb-4">
                        <label htmlFor="fullName">Full name</label>
                        <input
                            id="fullName"
                            type="text"
                            name="fullName"
                            value={user.fullName || ''}
                            onChange={(e) => setUser(prev => ({ ...prev, fullName: e.target.value }))}
                            className="form-control"
                            required
                            placeholder="Full name"
                        />
                    </div>

                    <div className="form-group mb-4">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows={4}
                            value={user.description || ''}
                            onChange={(e) => setUser(prev => ({ ...prev, description: e.target.value }))}
                            className="form-control"
                            required
                            placeholder="Description of doctor"
                        />
                    </div>

                    <div className="form-group mb-4 dropdown">
                        <label htmlFor="dropdownMenuButton1">Select Role</label>
                        <button className="btn main-button-outline-dark dropdown-toggle w-100" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {RoleEnum[user.role as keyof typeof RoleEnum]}
                        </button>
                        <ul className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton1">
                            <li style={{ cursor: "pointer" }} onClick={() => roleField("ROLE_USER")}>
                                <a className="dropdown-item">
                                    {RoleEnum.ROLE_USER}
                                </a>
                            </li>
                            <li style={{ cursor: "pointer" }} onClick={() => roleField("ROLE_DOCTOR")}>
                                <a className="dropdown-item">
                                    {RoleEnum.ROLE_DOCTOR}
                                </a>
                            </li>
                            <li style={{ cursor: "pointer" }} onClick={() => roleField("ROLE_ADMIN")}>
                                <a className="dropdown-item">
                                    {RoleEnum.ROLE_ADMIN}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {user.role && user.role === 'ROLE_DOCTOR' &&
                        <div className="form-group mb-4">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker', 'TimePicker']}>
                                    <TimePicker
                                        label="Start from"
                                        value={fromTime}
                                        onChange={(newValue) => {setFromTime(newValue);}}
                                    />
                                    <TimePicker
                                        label="Work till"
                                        value={toTime}
                                        onChange={(newValue) => {setToTime(newValue);}}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    }

                    <div className="form-group mb-4">
                        <div className="w-100"><span>Verified</span></div>
                        <label className="form-switch pointer">
                            <input
                                id="verified"
                                role="switch"
                                type="checkbox"
                                name="verified"
                                checked={user.verified}
                                onChange={(e) => setUser(prev => ({ ...prev, verified: e.target.checked }))}
                                className="pointer form-check-input"
                            />
                        </label>
                    </div>


                    <div className="form-group mb-4">
                        <label htmlFor="image">Image</label>
                        <input
                            id="image"
                            type="file"
                            accept="image/jpeg"
                            name="image"
                            onChange={(e) => base64Convertion(e)}
                            className="d-none"
                        />
                        <input
                            type="button"
                            className="form-control main-button-outline-dark"
                            onClick={() => document.getElementById("image")?.click()}
                            value={user.image ? "Choose another one..." : "Browse..."}
                        />
                    </div>

                    <div className="form-group mb-4">
                        {user.image && (
                            <iframe
                                title="Image viewer"
                                src={"data:image/jpeg;base64," + user.image}
                                width="100%"
                                height="600px"
                            ></iframe>
                        )}
                    </div>
                </div>

                <div className="form-group d-flex justify-content-center">
                    <button onClick={saveUser} type="button" className="btn btn-md main-button-outline-dark btn-block" disabled={submitting}>
                        {submitting && <span className="spinner-border spinner-border-sm"></span>}
                        <span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UserForm;