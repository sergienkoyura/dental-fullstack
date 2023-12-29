import AppointmentDTO from "./AppointmentDTO";

class PaymentInfoRequest{
    amount: number;
    currency: string;
    appointmentDTO: AppointmentDTO;

    constructor(amount: number, currency: string, appointmentDTO: AppointmentDTO){
        this.amount = amount;
        this.currency = currency;
        this.appointmentDTO = appointmentDTO;
    }
}

export default PaymentInfoRequest;