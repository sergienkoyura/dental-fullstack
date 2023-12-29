import AppointmentDTO from "../models/AppointmentDTO";
import MedicalCardDTO from "../models/MedicalCardDTO";
import UserDTO from "../models/UserDTO";
import api from "./api";

class DoctorService {
    getAppointmentsByDate(date?: string) {
        return api.get("/secure/appointments", {
            params: {
                date: date
            }
        })
    }

    completeAppointment(data: AppointmentDTO) {
        return api.patch(`secure/appointments/complete/${data.id}`)
    }

    getAllUsers(){
        return api.get("/secure/users/role-user")
    }

    getCardByUserEmail(data?: UserDTO){
        return api.get(`/secure/medical-card/user/${data?.id}`)
    }
}
export default new DoctorService();