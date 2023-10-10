import Quote from "./quote";
import React, { useState, useEffect } from "react";
import quotesService from "../services/quotes";
import usersService from "../services/users";


const address = "123 main";

const QuoteHistory = (props) => {
  const [arrayOfOrders, setArrayOfOrders] = useState([]);

  useEffect(() => {
    quotesService.getAllUserQuotes().then((res) => {
      setArrayOfOrders(res.data);
    });
  }, []);



  return (
    <div className="border">
      {arrayOfOrders.map((quote, index) => (
        <Quote 
        key={index} 
        object={arrayOfOrders[index]} 
        userAddress = {address}
        />
      ))}
    </div>
  );
};
/*
return (
    <div className="border">
      {arrayOfOrders.map((quote, index) => (
        <Quote key={index} object={arrayOfOrders[index]} />
      ))}
    </div>
  );
};
*/
export default QuoteHistory;
