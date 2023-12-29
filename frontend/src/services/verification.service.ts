import api from "./api";

class VerificationService{
    verify(code: string){
        return api.put("/secure/verification/verify", null, {
            params: {
                code: code
            }
        })
    }

    resend(){
        return api.post("/secure/verification/generate-and-send")
    }
}

export default new VerificationService();