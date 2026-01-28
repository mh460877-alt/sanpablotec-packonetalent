import { GOOGLE_SCRIPT_URL } from '../config/constants.js';
import { httpGet } from '../utils/http.js';

export const validateAdmin = async (user, pass) => {
  const params = new URLSearchParams({ accion: 'validarAdmin', admin: user, contrasena: pass });
  const result = await httpGet(`${GOOGLE_SCRIPT_URL}?${params.toString()}`);
  return result;
};

export const validateUser = (username, password, users) => {
  return users.find(u => {
    const userPass = typeof u.userPassword === 'number' ? u.userPassword.toString() : u.userPassword;
    const inputPass = typeof password === 'number' ? password.toString() : password;
    return u.userName.toLowerCase() === username.toLowerCase() && userPass === inputPass;
  }) || null;
};