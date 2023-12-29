class ContactRequest{
    fullName: string;
    email: string;
    description: string;
    constructor(fullname: string, email: string, description: string){
        this.fullName = fullname;
        this.email = email;
        this.description = description;
    }
}

export default ContactRequest;