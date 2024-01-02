import PricingDTO from "./PricingDTO";
import UserDTO from "./UserDTO";

class AppointmentDTO{
    id?: number;
    date: string;
    status: string;
    patient: UserDTO;
    doctor: UserDTO;
    pricing: PricingDTO;
    paid: boolean;

    constructor(date: string, status: string, patient: UserDTO, doctor: UserDTO, pricing: PricingDTO, paid: boolean, id?: number){
        this.date = date;
        this.status = status;
        this.patient = patient;
        this.doctor = doctor;
        this.pricing = pricing;
        this.paid = paid;
        this.id = id;
    }
}

export default AppointmentDTO;