import { BrowserRouter as Router, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import usersService from "../services/users";
import quoteService from "../services/quotes";

const QuoteForm = (props) => {
  const suggestedPrice = 2.8; //$ per gallon, fetch from pricing module
  const [gallons, setGallons] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [profitMargin, setProfitMargin] = useState("");
  const [address, setAdress] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  useEffect(() => {
    usersService.getUserByID().then((res) => {
      setAdress(res.data[0].address1);
    });
  }, []);

  const handleGallonsChange = (event) => {
    setGallons(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleProfitMarginChange = (event) => {
    setProfitMargin(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const quote = {
      suggestedPrice: suggestedPrice,
      gallons: gallons,
      date: selectedDate,
      address: address,
    };
    quoteService.createQuote(quote).then((res) => {
      
      setSuccessMessage(res.data.message);
      console.log(res.data.message);
      setGallons("");
      setSelectedDate("");
      setProfitMargin("");
      ///setSuccessMessage("");
      
    });
  };

  return (
    <div className="bigform">
      <form onSubmit={handleSubmit}>
        <h2 className="inline">Request a quote</h2>
        <h5>Please fill out the following: </h5>
        <div>
          <p>How many gallons do you plan to purchase?</p>
          <input
            className="textarea"
            type="number"
            id="gallons"
            name="gallons"
            placeholder=""
            value={gallons}
            onChange={handleGallonsChange}
            required
          />
        </div>

        <div>
          <p>Delivery Address</p>
          <input
            className="textarea"
            type="text"
            id="address"
            name="address"
            value={address}
            readOnly
          />
        </div>

        <div>
          <p>Delivery Date</p>
          <DatePicker
            className="textarea"
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MM/dd/yyyy"
          />
        </div>
        <div>
          <p>What is your company's profit margin</p>
          <input
            className="textarea"
            type="text"
            id="profitMargin"
            name="profitMargin"
            placeholder=""
            value={profitMargin}
            onChange={handleProfitMarginChange}
            required
          />
        </div>
        <div>
          <p>Suggested Price per gallon:</p>
          <input
            className="textarea"
            type="text"
            id="suggestedPrice"
            name="suggestedPricev"
            value={suggestedPrice}
            readOnly
          />
        </div>
        <div>
          <p>Total Amount Due:</p>
          <input
            className="textarea"
            type="text"
            id="total"
            name="total"
            value={suggestedPrice * gallons}
            readOnly
          />
        </div>
        <div className="success">{successMessage}</div>

        <button className="button" type="submit">
          Submit
        </button>

        <p className="text">
          Cancel
          {/* Cancel <Link to="/">Profile</Link> */}
        </p>
      </form>
    </div>
  );
};

export default QuoteForm;
