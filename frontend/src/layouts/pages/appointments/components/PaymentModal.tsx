import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import AppointmentDTO from "../../../../models/AppointmentDTO";
import { useState } from "react";
import PaymentInfoRequest from "../../../../models/PaymentInfoRequest";
import paymentService from "../../../../services/payment.service";
import authService from "../../../../services/auth.service";
import { StripeCardElement } from "@stripe/stripe-js";

export const PaymentModal: React.FC<{ item?: AppointmentDTO, changeState: any }> = (props) => {

    const elements = useElements();
    const stripe = useStripe();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false)

    function checkout() {
        var cardElement = elements?.getElement(CardElement);
        if (!stripe || !elements || !cardElement) {
            return;
        }

        setSubmitting(true);

        let paymentInfo = new PaymentInfoRequest(props.item?.cost! * 100, "UAH", props.item!);
        paymentService.paymentIntent(paymentInfo)
            .then((res) => {
                const stripeResponse = res.data;

                stripe.confirmCardPayment(
                    stripeResponse.client_secret, {
                    payment_method: {
                        card: cardElement as StripeCardElement,
                        billing_details: {
                            email: authService.getCurrentUser()?.email
                        }
                    }
                }, { handleActions: false }
                ).then((result) => {
                    if (result.error) {
                        setSubmitting(false);
                        setError("Error with payment");
                    } else {
                        paymentService.paymentComplete(paymentInfo)
                            .then(() => {
                                setSuccess(true);
                                setTimeout(() => {
                                    document.getElementById(`close${props.item?.id}`)?.click();
                                    props.changeState();
                                    setSubmitting(false);
                                }, 1000);
                                
                            })
                            .catch((err) => {
                                setError(err.message);
                                setSubmitting(false);
                            })
                    }
                })
            })
            .catch((err) => {
                setError(err.message);
                setSubmitting(false);
            })
    }

    return (
        <div className="modal fade" id={`modal`} data-bs-backdrop='static' data-bs-keyboard='false'
            aria-labelledby='staticBackdropLabel' aria-label="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">
                            Pay for the appointment
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss='modal' aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <div className="mt-3">
                                <div>
                                    <h3>{props.item?.description}</h3>
                                    <h6>Cost: {props.item?.cost} UAH</h6>
                                    <hr />
                                    <CardElement id="card-element" />
                                </div>
                                <hr />
                                <div className="mt-3">
                                    {error.length > 0 || success &&
                                        <p className={`alert ${success ? "alert-success" : "alert-danger"}`}>
                                            {success ? "Success!" : error}
                                        </p>
                                    }
                                    <button className="btn main-button-dark d-inline m-1"
                                        onClick={() => checkout()} disabled={submitting}>
                                        {submitting && <span className="spinner-border spinner-border-sm"></span>}
                                        Pay
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button id={`close${props.item?.id}`} type="button" className="btn btn-secondary" data-bs-dismiss='modal'>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PaymentModal;