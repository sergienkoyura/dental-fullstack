import {useState} from "react";
import publicService from "../../../../services/public.service";
import ContactRequest from "../../../../models/ContactRequest";
import ReCAPTCHA from 'react-google-recaptcha';
import config from "../../../../global-config";

export const ContactForm = () => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    function handleRecaptchaVerify(){
        setIsVerified(true);
    }

    function submitForm() {
        if(!isVerified){
            setMessage("Please verify reCAPTCHA")
            setIsError(true)
        } else {

            setLoading(true);
            publicService.sendContact(new ContactRequest(fullName, email, description))
                .then(() => {
                    setIsError(false);
                    setMessage("Success!");
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                })
                .catch((err) => {
                    setIsError(true);
                    setMessage(err.response.data.message);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    }
    return (
        <div>
            <div className="doctor-wrap d-flex justify-content-center">
                <div className="main-text-dark col-md-10 col-sm-12 container row mb-5">
                    <div className="col-md-6 col-sm-12 d-flex align-items-center">
                        <div className="flex-wrapper w-100">
                            {message &&
                                <p className={`alert ${isError ? "alert-danger" : "alert-success"}`}>{message}</p>
                            }
                            <div className="mb-3">
                                <h3>We will reply you soon!</h3>
                            </div>
                            <form className="main-text-dark" method="POST">
                                <div className="form-block mb-4">
                                    <label className="form-label">Full Name</label>
                                    <input type="text" value={fullName} onChange={(e) => { setFullName(e.target.value) }} className="form-control"></input>
                                </div>
                                <div className="form-block mb-4">
                                    <label className="form-label">Email</label>
                                    <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} className="form-control"></input>
                                </div>
                                <div className="form-block mb-4">
                                    <label className="form-label">Description</label>
                                    <textarea className="form-control" value={description} onChange={(e) => { setDescription(e.target.value) }} rows={3}></textarea>
                                </div>
                                <div className="form-block mb-4">
                                    <ReCAPTCHA
                                        sitekey={config.captchaSiteKey}
                                        onChange={handleRecaptchaVerify}
                                    />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button type="button" className="btn main-button-outline-dark" onClick={() => { submitForm() }} disabled={loading}>
                                        {loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 align-items-center d-sm-none d-md-flex">
                        <div className="card-img d-flex justify-content-center">
                            <img className="rounded-4" src={require("./../../../../assets/images/clinic-contact.jpg")} width={300} height={400} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}