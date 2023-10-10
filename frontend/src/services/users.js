import axios from "axios";
const baseUrl = "http://localhost:3001/api/users";

const getAll = () => {
  return axios.get(baseUrl);
};

const getUserByName = (name) => {
  const users = axios.get(`${baseUrl}/${name}`);
  return users;
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
  return axios.put(`${baseUrl}/updateProfile`, updateProfObj, { headers: { token: localStorage.getItem("token") },});
};

// User data to get address
// This is probably wrong
const getAllUserData = () => {
  return axios.get(`${baseUrl}/usersData`, {
    headers: { token: localStorage.getItem("token") },
  });
};

export default {
  getAll,
  getUserByName,
  getUserProf,
  login,
  register,
  updateProfile,

  //Addition
  getAllUserData,
};
