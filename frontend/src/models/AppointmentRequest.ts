import PricingDTO from "./PricingDTO";

class AppointmentRequest{
    status: string;
    doctorFullName: string;
    pricing?: PricingDTO;
    patientEmail?: string;
    date?: string;
    
    constructor(status: string, doctor: string, pricing?: PricingDTO, patient?: string, date?: string, ){
        this.status = status;
        this.doctorFullName = doctor;
        this.pricing = pricing;
        this.patientEmail = patient;
        this.date = date;
    }
}

export default AppointmentRequest;