import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import usersService from "../services/users";
import quoteService from "../services/quotes";

const QuoteForm = () => {
  const [gallons, setGallons] = useState("");
  const [quoteHistory, setQuoteHistory] = useState(0);
  const [state, setState] = useState("");

  const [selectedDate, setSelectedDate] = useState(null);
  // const [profitMargin, setProfitMargin] = useState(3);
  const [address, setAdress] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [suggestedPrice, setSuggestedPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  //
  const [submitDisabled, setSubmitDisabled] = useState(true);
  //
  useEffect(() => {
    usersService.getUserByID().then((res) => {
      // console.log(res.data);
      setAdress(`${res.data.address1}, ${res.data.city}, ${res.data.state}`);
      setState(res.data.state);
    });
    quoteService.getAllUserQuotes().then((res) => {
      // console.log(res.data.length);
      setQuoteHistory(res.data.length);
    });
  }, []);

  const handleGallonsChange = (event) => {
    setGallons(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // const handleProfitMarginChange = (event) => {
  //   setProfitMargin(event.target.value);
  // };

  /*
  const handleSubmit = (event) => {
    event.preventDefault();
    const quote = {
      suggestedPrice: suggestedPrice,
      gallons: gallons,
      date: selectedDate,
      address: address,
      pricePerGalon: suggestedPrice,
      totalAmount: totalAmount,
      
    };
    quoteService.createQuote(quote).then((res) => {
      setSuccessMessage(res.data.message);
      console.log(res.data.message);
      setGallons("");
      setSelectedDate("");
      // setProfitMargin("");
      setSuggestedPrice(0);
      setTotalAmount(0);

      //___________________________________________________________
      setSubmitDisabled(true); // Disable the submit button after submission
      //___________________________________________________________

    });
  };

*/
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if gallons is greater than 0 and a date is selected
    if (parseFloat(gallons) > 0 && selectedDate) {
      // Calculate fuelRate
      const fuelRate = parseFloat(gallons) / parseFloat(totalAmount);

      const quote = {
        gallons: gallons,
        date: selectedDate,
        address: address,
        pricePerGalon: suggestedPrice,
        totalAmount: totalAmount,
        fuelRate: fuelRate, // Include fuelRate in the quote
      };

      quoteService.createQuote(quote).then((res) => {
        setSuccessMessage(res.data.message);
        console.log(res.data.message);
        setGallons("");
        setSelectedDate("");
        setSuggestedPrice(0);
        setTotalAmount(0);
        setSubmitDisabled(true); // Disable the submit button after submission
      });
    } else {
      if (parseFloat(gallons) <= 0) {
        console.log("Please enter a valid number of gallons.");
      }
      if (!selectedDate) {
        console.log("Please select a delivery date.");
      }
    }
  };

  /*
  const handleGetQuote = (event) => {
    event.preventDefault();
    const quote = {
      gallons: gallons,
      state: state,
      quoteHistory: quoteHistory,
    };
    quoteService.getQuote(quote).then((res) => {
      console.log('Get Quote Response:', res.data);
      setSuggestedPrice(res.data.suggestedPricePerGallon);
      setTotalAmount(res.data.totalAmount);

      //___________________________________________________________
      setSubmitDisabled(!(res.data.suggestedPricePerGallon > 0 && res.data.totalAmount > 0));
      //___________________________________________________________

    });
  };
*/

  /*
const handleGetQuote = (event) => {
  event.preventDefault();

  // Check if gallons is greater than 0 before making the quote request
  if (parseFloat(gallons) > 0) {
    const quote = {
      gallons: gallons,
      state: state,
      quoteHistory: quoteHistory,
    };
    quoteService.getQuote(quote).then((res) => {
      console.log('Get Quote Response:', res.data);
      setSuggestedPrice(res.data.suggestedPricePerGallon);
      setTotalAmount(res.data.totalAmount);
      setSubmitDisabled(!(res.data.suggestedPricePerGallon > 0 && res.data.totalAmount > 0 ));
    });
  } else {
    console.log('Please enter a valid number of gallons.');
  }
};
*/

  const handleGetQuote = (event) => {
    event.preventDefault();

    // Check if gallons is greater than 0 and a date is selected before making the quote request
    if (parseFloat(gallons) > 0 && selectedDate) {
      const quote = {
        gallons: gallons,
        state: state,
        quoteHistory: quoteHistory,
      };
      quoteService.getQuote(quote).then((res) => {
        console.log("Get Quote Response:", res.data);
        setSuggestedPrice(res.data.suggestedPricePerGallon);
        setTotalAmount(res.data.totalAmount);
        setSubmitDisabled(
          !(res.data.suggestedPricePerGallon > 0 && res.data.totalAmount > 0)
        );
      });
    } else {
      if (parseFloat(gallons) <= 0) {
        console.log("Please enter a valid number of gallons.");
      }
      if (!selectedDate) {
        console.log("Please select a delivery date.");
      }
    }
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
        {/* <div>
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
        </div> */}
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
            value={totalAmount}
            readOnly
          />
        </div>

        <div className="success">{successMessage}</div>
        <button className="button" type="submit" disabled={submitDisabled}>
          Submit
        </button>

        <button className="button" onClick={handleGetQuote}>
          Get Quote
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
