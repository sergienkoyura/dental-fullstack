import ContactRequest from "../models/ContactRequest";
import api from "./api";

class PublicService {
    getAllPricings() {
        return api.get("/public/pricing")
    }

    getAllDoctors() {
        return api.get("/public/users/doctors")
    }

    sendContact(data: ContactRequest){
        return api.post("public/contact", data);
    }
}
export default new PublicService();