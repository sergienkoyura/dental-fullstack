import UserDTO from "./UserDTO";

class AppointmentRequest{
    description: string;
    status: string;
    doctorFullName: string;
    cost?: number;
    duration?: string;
    patientEmail?: string;
    date?: string;
    
    constructor(description: string, status: string, doctor: string, cost?: number, duration?: string, patient?: string, date?: string, ){
        this.description = description;
        this.status = status;
        this.doctorFullName = doctor;
        this.cost = cost;
        this.duration = duration;
        this.patientEmail = patient;
        this.date = date;
    }
}

export default AppointmentRequest;