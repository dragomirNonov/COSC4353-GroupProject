import axios from "axios";
const baseUrl = "http://localhost:3001/api/users";

const getUserByID = () => {
  const user = axios.get(`${baseUrl}/id`, {
    headers: { token: localStorage.getItem("token") },
  });
  return user;
};

const getUserProf = () => {
  return axios.get(`http://localhost:3001/api/profile`, {
    headers: { token: localStorage.getItem("token") },
  });
};

const login = (loginObj) => {
  return axios.post(`http://localhost:3001/api/login`, loginObj);
};

const register = (rejisterObj) => {
  return axios.post(baseUrl, rejisterObj);
};

const updateProfile = (updateProfObj) => {
  return axios.put(`${baseUrl}/updateProfile`, updateProfObj, {
    headers: { token: localStorage.getItem("token") },
  });
};

const updateAccount = (updateAccObj) => {
  return axios.put(`${baseUrl}/updateAccount`, updateAccObj, {
    headers: { token: localStorage.getItem("token") },
  });
};

export default {
  getUserProf,
  login,
  register,
  updateProfile,
  updateAccount,
  getUserByID,
};
