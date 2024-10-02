import api from "../utils/api";

export const signUp = (userData) => api.post("/signup", userData);

export const signIn = (credentials) => api.post("/login", credentials);
