import TimeEnum from "./TimeEnum";
import UserDTO from "./UserDTO";

class AppointmentDTO{
    id?: number;
    date: string;
    duration: string;
    description: string;
    status: string;
    patient: UserDTO;
    doctor: UserDTO;
    cost: number;
    paid: boolean;

    constructor(date: string, duration: string, description: string, status: string, patient: UserDTO, doctor: UserDTO, cost: number, paid: boolean, id?: number){
        this.date = date;
        this.duration = duration;
        this.description = description;
        this.status = status;
        this.patient = patient;
        this.doctor = doctor;
        this.cost = cost;
        this.paid = paid;
        this.id = id;
    }
}

export default AppointmentDTO;