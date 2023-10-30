import axios from "axios";
const baseUrl = "http://localhost:3001/api/quotes";

//GET all quotes
const getAll = () => {
  return axios.get(baseUrl);
};

//Get quotes for User
const getAllUserQuotes = () => {
  return axios.get(`${baseUrl}/user`, {
    headers: { token: localStorage.getItem("token") },
  });
};

//Create new quote
const createQuote = (quoteObj) => {
  return axios.post(baseUrl, quoteObj, {
    headers: { token: localStorage.getItem("token") },
  });
};

//Get final quote
const getQuote = (quoteObj) => {
  return axios.get(`${baseUrl}/getquote`, {
    params: quoteObj,
    headers: { token: localStorage.getItem("token") },
  });
};

export default {
  getAll,
  getAllUserQuotes,
  createQuote,
  getQuote,
};
