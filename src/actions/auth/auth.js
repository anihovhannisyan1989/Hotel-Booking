import axios from "axios";

export const register = async (user) => 
    await axios.post(`${import.meta.env.VITE_APP_API}/register`, user);

export const login = async (user) => 
    await axios.post(`${import.meta.env.VITE_APP_API}/login`, user);