import PricingDTO from '../models/PricingDTO';
import UserDTO from '../models/UserDTO';
import api from './api';

class AdminService {

  getPricing(data: PricingDTO){ 
    return api.get(`/secure/pricing/${data.id}`)
  }

  savePricing(data: PricingDTO){
    return api.post("/secure/pricing", data);
  }

  deletePricing(data: PricingDTO){
    return api.delete(`secure/pricing/${data.id}`)
  }

  getAllUsers(){
    return api.get("/secure/users");
  }

  addUser(data: UserDTO){
    return api.post("/secure/users", data)
  }

  deleteUser(data: UserDTO){
    return api.delete(`secure/users/${data.id}`)
  }

  getAppointmentsByDate(data?: string){
    return api.get("/secure/appointments/scheduled/all", {
      params: {
        date: data
      }
    })
  }
}

export default new AdminService();