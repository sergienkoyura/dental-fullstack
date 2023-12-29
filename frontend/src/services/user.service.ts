import MedicalCardDTO from '../models/MedicalCardDTO';
import PasswordRequest from '../models/PasswordRequest';
import UserDTO from '../models/UserDTO';
import api from './api';

class UserService {

  getUserData(){
    return api.get("/secure/users/user-profile")
  }

  saveAccountData(data: UserDTO){ 
    return api.patch("/secure/users/update", data)
  }

  savePassword(data: PasswordRequest){
    return api.patch("/secure/users/update/password", data)
  }

  getUserCard(){
    return api.get("/secure/medical-card")
  }

  saveCard(data: MedicalCardDTO){
    return api.post("/secure/medical-card", data)
  }
}

export default new UserService();