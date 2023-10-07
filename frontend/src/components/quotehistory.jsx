import Quote from "./quote";
import React, { useState, useEffect } from "react";
import quotesService from "../services/quotes";

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
        <Quote key={index} object={arrayOfOrders[index]} />
      ))}
    </div>
  );
};

export default QuoteHistory;
