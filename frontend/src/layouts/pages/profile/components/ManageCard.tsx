import React, {useEffect, useState} from "react";
import authService from "../../../../services/auth.service";
import userService from "../../../../services/user.service";
import {SpinnerLoading} from "../../../utils/SpinnerLoading";
import MedicalCardDTO from "../../../../models/MedicalCardDTO";

const ManageCard = () => {

    const user = authService.getCurrentUser();

    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const [card, setCard] = useState<MedicalCardDTO>({});
    const [messageCard, setMessageCard] = useState("");
    const [submittingCard, setSubmittingCard] = useState(false);



    const [saved, setSaved] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchUser = async () => {
            try {
                const rs = await userService.getUserCard();
                setCard(rs.data);

            } catch (error: any) {
                setHttpError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, [saved]);


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

    async function base64Convertion(e: any) {
        if (e.target.files[0]) {
            getBase64(e.target.files[0]);
        }
    }

    function getBase64(file: any) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setCard(prev => ({ ...prev, newestResults: reader.result?.toString().split(",")[1] }));
        }
        reader.onerror = function (error) {
            console.log('Error', error);
        }
    }

    function submitCard() {
        //setCard(prev => ({...prev,  newestResults: pdf }));
        setSubmittingCard(true);
        userService.saveCard(card)
            .then((res) => {
                setMessageCard("Saved!");
                setSaved(!saved);
                window.scrollTo(0, 0);
            })
            .catch((err: any) => {
                setMessageCard(err?.response?.data?.message || "Error occurred");
            })
            .finally(() => {
                setSubmittingCard(false);
            })
    }

    return (
        <form className="p-3 main-text-dark">
            <div className="text-center mb-4">
                <h3 className="fw-semibold">Medical card information</h3>
            </div>

            {messageCard && (
                <div className="form-group d-flex justify-content-center">
                    <div className="alert alert-info px-3 my-2 text-center d-inline" role="alert">
                        {messageCard}
                    </div>
                </div>
            )}
            <div className="container flex-grow-1 d-flex justify-content-center row">
                <div className="col-lg-6 col-md-12 p-2">

                    <div className="form-group mb-4">
                        <label htmlFor="latestReport">Latest Report</label>
                        <textarea
                            id="latestReport"
                            rows={3}
                            placeholder="There will be the result of your last visit"
                            name="latestReport"
                            value={card?.latestReport || ''}
                            onChange={(e) => setCard(prev => ({ ...prev, latestReport: e.target.value }))}
                            className="form-control"
                            readOnly
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
                            required
                            placeholder="Your latest disease"
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
                            required
                            placeholder="Disease Description"
                        />
                    </div>
                </div>
                <div className="col-lg-6 col-md-12 p-2">
                    <div className="form-group mb-4">
                        <label htmlFor="newestResults">Newest Results</label>
                        <input
                            id="newestResults"
                            type="file"
                            accept="application/pdf"
                            name="newestResults"
                            onChange={(e) => base64Convertion(e)}
                            className="d-none"
                        />
                        <input
                            id="buttonNewestResults"
                            type="button"
                            className="form-control main-button-outline-dark"
                            onClick={() => document.getElementById("newestResults")?.click()}
                            value={card.newestResults ? "Choose another one..." : "Browse..."}
                        />
                    </div>

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
        </form>
    );
};

export default ManageCard;
