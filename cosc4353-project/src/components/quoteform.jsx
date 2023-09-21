import { BrowserRouter as Router, Link } from "react-router-dom";
import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const QuoteForm = (props) => {
  const suggestedPrice = 3; //$ per gallon, fetch from pricing module
  //const total = gallons * suggestedPrice;
  const [gallons, setGallons] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [previousCustomer, setPreviousCustomer] = useState("");
  const [lastPurchase, setLastPurchase] = useState("");
  const [name, setName] = useState("");
  const [profitMargin, setProfitMargin] = useState("");
  
  const handleGallonsChange = (event) => {
    setGallons(event.target.value);
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handlePreviousCustomerChange = (event) => {
    setPreviousCustomer(event.target.value);
  };

  const handleLastPurchaseChange = (event) => {
    setLastPurchase(event.target.value);
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleProfitMarginChange = (event) => {
    setProfitMargin(event.target.value);
  }



  const handleSubmit = (event) => {
    event.preventDefault();

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
            value = "11 Street Dr. Houston, TX 77777"
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
          <p>Have you purchased fuel before?</p>  
          <input
            className="textarea"
            type="text"
            id="previousCustomer"
            name="previousCustomer"
            placeholder="Yes"
            value={previousCustomer}
            onChange={handlePreviousCustomerChange}
            required
          />
        </div>
        <div>
          <p>When was your last purchase?</p>  
          <input
            className="textarea"
            type="text"
            id="lastPurchase"
            name="lastPurchase"
            placeholder=""
            value={lastPurchase}
            onChange={handleLastPurchaseChange}
            required
          />
        </div>

        <div>
          <p>Organization Name</p>  
          <input
            className="textarea"
            type="text"
            id="name"
            name="name"
            placeholder=""
            value={name}
            onChange={handleNameChange}
            required
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
            value={suggestedPrice*gallons}
            readOnly 
          />
        </div>



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
