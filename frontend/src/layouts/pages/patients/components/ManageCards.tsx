import {useEffect, useState} from "react";
import MedicalCardDTO from "../../../../models/MedicalCardDTO";
import userService from "../../../../services/user.service";
import {SpinnerLoading} from "../../../utils/SpinnerLoading";
import doctorService from "../../../../services/doctor.service";
import UserDTO from "../../../../models/UserDTO";

const ManageCards = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const [card, setCard] = useState<MedicalCardDTO>({});
    const [messageCard, setMessageCard] = useState("");
    const [isMessageError, setIsMessageError] = useState(false);
    const [submittingCard, setSubmittingCard] = useState(false);
    const [isCardLoading, setIsCardLoading] = useState(false);

    const [users, setUsers] = useState<UserDTO[]>();
    const [selectedUser, setSelectedUser] = useState<UserDTO>();


    useEffect(() => {
        doctorService.getAllUsers()
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                setHttpError(err.message)
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, []);

    if (isLoading) {
        return <SpinnerLoading />;
    }

    if (httpError) {
        return (
            <div className="text-danger container m-5">
                <p>{httpError}</p>
            </div>
        );
    }

    function findMedicalCard(user: UserDTO) {
        setMessageCard("")
        setIsCardLoading(true);
        setSelectedUser(user)
        doctorService.getCardByUserEmail(user)
            .then((res) => {
                setCard(res.data)
            })
            .catch((err) => {
                setHttpError(err);
            })
            .finally(() => {
                setIsCardLoading(false);
            })

    }

    function submitCard() {
        setSubmittingCard(true);
        userService.saveCard(card)
            .then(() => {
                setMessageCard("Saved!");
                window.scrollTo(0, 0);
            })
            .catch((err: any) => {
                setMessageCard(err?.response?.data?.message || "Error occurred");
                setIsMessageError(true);
            })
            .finally(() => {
                setSubmittingCard(false);
            })
    }

    function searchList(searchTerm: string) {
        let rowList = document.querySelectorAll<HTMLElement>(".li-to-search");
        rowList.forEach(el => {
            el.style.display = "block";
        })
        rowList.forEach(el => {
            if (!el.textContent?.toLowerCase().includes(searchTerm.toLowerCase()))
                el.style.display = "none";
        })
    }

    return (
        <form className="p-3 main-text-dark">
            <div className="text-center">
                <h1>Pick the patient</h1>
            </div>
            <div className="container-fluid">
                <div className="form-group mb-4 dropdown">
                    <button className="btn main-button-outline-dark dropdown-toggle w-100 text-center" style={{ overflow: "hidden", textOverflow: "ellipsis" }} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {!selectedUser ? "Select a patient " : selectedUser?.fullName}
                    </button>
                    <ul className="dropdown-menu w-100 table-scrollable" aria-labelledby="dropdownMenuButton1">
                        <li className="p-2">
                            <label className="mx-2 d-inline">Search for:</label>
                            <input type="text" placeholder="Patient name..." className="w-auto mx-2 form-control d-inline" onChange={(e) => { searchList(e.target.value); }} />
                        </li>
                        {users?.map(el => (
                            <li className="li-to-search" key={el.id} style={{ cursor: "pointer" }} onClick={() => { findMedicalCard(el) }}>
                                <a className="dropdown-item">
                                    {el.fullName}: {el.email}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="text-center mb-4">
                <h3 className="fw-semibold">Medical card information</h3>
            </div>

            {
                messageCard && (
                    <div className="form-group d-flex justify-content-center">
                        <div className={`alert px-3 my-2 text-center d-inline ${isMessageError ? "alert-danger" : "alert-success"}`} role="alert">
                            {messageCard}
                        </div>
                    </div>
                )
            }
            <div className="container flex-grow-1 d-flex justify-content-center row">
                <div className="col-lg-6 col-md-12 p-2">

                    <div className="form-group mb-4">
                        <label htmlFor="latestReport">Latest Report</label>
                        <textarea
                            id="latestReport"
                            rows={3}
                            placeholder="Last visit result"
                            name="latestReport"
                            value={card?.latestReport || ''}
                            onChange={(e) => setCard(prev => ({ ...prev, latestReport: e.target.value }))}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group mb-4">
                        <label htmlFor="latestDisease">Latest Disease</label>
                        <input
                            id="latestDisease"
                            type="text"
                            name="latestDisease"
                            value={card?.latestDisease || ''}
                            onChange={(e) => setCard(prev => ({ ...prev, latestDisease: e.target.value }))}
                            className="form-control"
                            placeholder="Latest disease"
                        />
                    </div>

                    <div className="form-group mb-4">
                        <label htmlFor="diseaseDescription">Disease Description</label>
                        <textarea
                            id="diseaseDescription"
                            rows={3}
                            name="diseaseDescription"
                            value={card?.diseaseDescription || ''}
                            onChange={(e) => setCard(prev => ({ ...prev, diseaseDescription: e.target.value }))}
                            className="form-control"
                            placeholder="Disease Description"
                        />
                    </div>
                </div>
                <div className="col-lg-6 col-md-12 p-2">
                    <div className="form-group mb-4">
                        {card.newestResults && (
                            <iframe
                                title="PDF Viewer"
                                src={"data:application/pdf;base64," + card.newestResults}
                                width="100%"
                                height="500px"
                            ></iframe>
                        )}
                    </div>
                </div>
            </div>
            <div className="form-group d-flex justify-content-center">
                <button onClick={submitCard} type="submit" className="btn btn-md main-button-outline-dark btn-block" disabled={submittingCard}>
                    {submittingCard && <span className="spinner-border spinner-border-sm"></span>}
                    <span>Save</span>
                </button>
            </div>
        </form >
    );
};

export default ManageCards;
