export const isNotEmpty = (value) => value && String(value).trim().length > 0;
export const isValidUsername = (username) => isNotEmpty(username) && username.length >= 3;
export const isValidPassword = (password) => isNotEmpty(password) && password.length >= 4;