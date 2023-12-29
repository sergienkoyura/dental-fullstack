import PaymentInfoRequest from "../models/PaymentInfoRequest";
import api from "./api";

class PaymentService {
    paymentIntent(data: PaymentInfoRequest){
        return api.post("/secure/payments/payment-intent", data)
    }

    paymentComplete(data: PaymentInfoRequest){
        return api.put("/secure/payments/payment-complete", data)
    }
}

export default new PaymentService();