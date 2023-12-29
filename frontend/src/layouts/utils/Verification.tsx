import {useState} from "react";
import verificationService from "../../services/verification.service";

export const Verification = (setState: any) => {

    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function resendCode() {
        setIsLoading(true);
        setMessage("")
        verificationService.resend()
            .then(() => {
                setMessage("Resent!")
            })
            .catch((err) => {
                setMessage(err.response.data.message)
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    function verifyCode() {
        setIsLoading(true);
        setMessage("")
        verificationService.verify(code)
            .then(() => {
                setMessage("Success!")
                window.location.reload();
            })
            .catch((err) => {
                setMessage(err.response.data.message)
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="alert alert-warning">
                <h3>Your account is not verified.</h3>
                <p className="m-0">Code was sent to your email. Enter it to verify account:</p>
                <input value={code} onChange={(e) => setCode(e.target.value)} type="text" className="form-control w-auto d-inline me-3 my-2" />
                <button onClick={() => verifyCode()} className="btn btn-success d-inline me-2" disabled={isLoading}>
                    {isLoading && (
                        <span className="spinner-border spinner-border-sm"></span>
                    )}
                    Verify
                </button>
                <button onClick={() => resendCode()} className="btn btn-warning d-inline me-2" disabled={isLoading}>
                    {isLoading && (
                        <span className="spinner-border spinner-border-sm"></span>
                    )}
                    Resend
                </button>
                <p className="m-0 text-center">
                    {message}
                </p>
            </div>
        </div>
    );
}
export default Verification;