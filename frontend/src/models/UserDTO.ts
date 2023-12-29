class UserDTO{
    id: number;
    email?: string;
    fullName?: string;
    description?: string;
    verified?: boolean;
    role?: string;
    password?: string;
    image?: any;
    fromTime?: string;
    toTime?: string;

    constructor(id: number, email?: string, fullName?: string, description?: string, verified?: boolean, role?: string, password?: string, image?: any,
        fromTime?: string, toTime?: string){
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.description = description;
        this.verified = verified;
        this.role = role;
        this.password = password;
        this.image = image;
        this.fromTime = fromTime;
        this.toTime = toTime;
    }
}

export default UserDTO