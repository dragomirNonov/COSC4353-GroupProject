import axios from "axios";
const baseUrl = "http://localhost:3001/api/users";

const getAll = () => {
  return axios.get(baseUrl);
};
const getUserByName = (name) => {
  const users = axios.get(`${baseUrl}/${name}`);
  return users;
};

const login = (loginObj) => {
  return axios.post(`http://localhost:3001/api/login`, loginObj);
};

const register = (rejisterObj) => {
  return axios.post(baseUrl, rejisterObj);
};

const updateProfile = (updateProfObj) => {
  return axios.put(baseUrl, updateProfObj);
};

export default {
  getAll,
  getUserByName,
  login,
  register,
  updateProfile,
};
