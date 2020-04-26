const AUTH_TOKEN = 'AUTH_TOKEN';

export const getToken = () => localStorage.getItem(AUTH_TOKEN) || sessionStorage.getItem(AUTH_TOKEN);

export const setToken = (token, remember) => {
  clearToken();
  (remember ? localStorage : sessionStorage).setItem(AUTH_TOKEN, token);
};

export const clearToken = () => {
  localStorage.removeItem(AUTH_TOKEN);
  sessionStorage.removeItem(AUTH_TOKEN);
};
