import axios from "axios";
import TokenService from "./token.service";
import authService from "./auth.service";
import config from "../global-config";

const instance = axios.create({
  baseURL: config.baseURI,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      if (config.url !== "/auth/refresh-token") {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/auth/authenticate" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && originalConfig.url !== "/auth/refresh-token" && !originalConfig._retry) {
        try {
          const rs = await instance.post("/auth/refresh-token", {
            accessToken: TokenService.getLocalAccessToken(),
            refreshToken: TokenService.getLocalRefreshToken(),
          });
          originalConfig._retry = true;

          TokenService.updateLocalAccessToken(rs.data.accessToken);

          return instance(originalConfig);
        } catch (_error: any) {
          authService.logout();
          return;
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;