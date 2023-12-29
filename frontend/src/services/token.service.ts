import { jwtDecode } from 'jwt-decode';

interface User {
  refreshToken?: string;
  accessToken?: string;
  email?: string;
  role?: string;
}

const getLocalRefreshToken = (): string | undefined => {
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");
  return user?.refreshToken;
};

const getLocalAccessToken = (): string | undefined => {
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");
  return user?.accessToken;
};

const updateLocalAccessToken = (accessToken: string): void => {
  let user: User = JSON.parse(localStorage.getItem("user") || "{}");
  user.accessToken = accessToken;
  localStorage.setItem("user", JSON.stringify(user));
  // window.location.reload();
};

const getUser = (): User | null => {
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");
  if (user.accessToken){
    user.email = jwtDecode(user.accessToken).sub;
    user.role = jwtDecode(user.accessToken).iss;
  }
  return user;
};

const setUser = (user: User): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

const removeUser = (): void => {
  localStorage.removeItem("user");
};

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  getUser,
  setUser,
  removeUser,
};

export default TokenService;