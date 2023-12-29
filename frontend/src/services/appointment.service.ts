import AppointmentDTO from '../models/AppointmentDTO';
import AppointmentRequest from '../models/AppointmentRequest';
import MedicalCardDTO from '../models/MedicalCardDTO';
import PasswordRequest from '../models/PasswordRequest';
import TimeEnum from '../models/TimeEnum';
import UserDTO from '../models/UserDTO';
import api from './api';

class AppointmentService {
  bookAppointment(data: AppointmentRequest) {
    return api.post("/secure/appointments", data);
  }

  getAvailableIntervals(date: string, time?: string) {
    return api.get("/secure/appointments/available", {
      params: {
        date: date,
        time: time
      }
    })
  }

  getScheduledAppointments( pageNumber: number, pageSize: number ) {
    return api.get("/secure/appointments/scheduled", {
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize
      }
    })
  }

  getHistoryAppointments( pageNumber: number, pageSize: number ) {
    return api.get("/secure/appointments/history", {
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize
      }
    })
  }

  cancelAppointment(data: AppointmentDTO){
    return api.delete(`secure/appointments/${data.id}`)
  }
}

export default new AppointmentService();