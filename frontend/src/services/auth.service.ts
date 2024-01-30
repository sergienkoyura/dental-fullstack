import api from "./api";
import TokenService from "./token.service";

class AuthService {
    login(email: string, password: string) {
        return api
            .post("/auth/authenticate", {
                email,
                password
            })
            .then(response => {
                console.log(response)
                if (response.data.accessToken) {
                    TokenService.setUser(response.data);
                }

                return response.data;
            });
    }

    logout() {

        return api
            .post("/auth/logout")
            .catch((err: any) => {
                console.log(err)
            })
            .then(() => {
                TokenService.removeUser();
            });
    }

    register(fullname: string, email: string, password: string) {
        return api.post("/auth/register", {
            fullname,
            email,
            password
        }).then(response => {
            if (response.data.accessToken) {
                TokenService.setUser(response.data);
            }

            return response.data;
        });
    }

    getCurrentUser() {
        return TokenService.getUser();
    }
}

export default new AuthService();