import Quote from "./quote";
import React, { useState, useEffect } from "react";
import quotesService from "../services/quotes";
import usersService from "../services/users";



const QuoteHistory = (props) => {
  const [arrayOfOrders, setArrayOfOrders] = useState([]);
  const [address1, setAdress1] = useState("");
  const [address2, setAdress2] = useState("");
  const [address3, setAdress3] = useState("");
  const [address4, setAdress4] = useState("");
  const [address5, setAdress5] = useState("");

  useEffect(() => {
    quotesService.getAllUserQuotes().then((res) => {
      setArrayOfOrders(res.data);
    });
  }, []);

  //address1
  useEffect(() => {
    usersService.getUserByID().then((res) => {
      setAdress1(res.data[0].address1);
    });
  }, []);


  //address 2
  useEffect(() => {
    usersService.getUserByID().then((res) => {
      setAdress2(res.data[0].address2);
    });
  }, []);

  //city
  useEffect(() => {
    usersService.getUserByID().then((res) => {
      setAdress3(res.data[0].city);
    });
  }, []);

  //state
  useEffect(() => {
    usersService.getUserByID().then((res) => {
      setAdress4(res.data[0].state);
    });
  }, []);

  //zip
  useEffect(() => {
    usersService.getUserByID().then((res) => {
      setAdress5(res.data[0].zip);
    });
  }, []);

  return (
    <div className="border">
      {arrayOfOrders.map((quote, index) => (
        <Quote 
        key={index} 
        object={arrayOfOrders[index]} 
        userAddress = {address1}
        userAddress2 = {address2}
        userAddress3 = {address3}
        userAddress4 = {address4}
        userAddress5 = {address5}
        />
      ))}
    </div>
  );
};
export default QuoteHistory;
