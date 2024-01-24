import AppointmentDTO from "../models/AppointmentDTO";
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

    setPaid(data: AppointmentDTO) {
        return api.patch(`secure/appointments/pay/${data.id}`)
    }
    
    completeAppointment(data: AppointmentDTO) {
        return api.patch(`secure/appointments/complete/${data.id}`)
    }

    cancelAppointment(data: AppointmentDTO) {
        return api.delete(`secure/appointments/${data.id}`)
    }

    getAllUsers(){
        return api.get("/secure/users/role-user")
    }

    getCardByUserEmail(data?: UserDTO){
        return api.get(`/secure/medical-card/user/${data?.id}`)
    }
}
export default new DoctorService();