import { BrowserRouter as Router, Link } from "react-router-dom";
import { useState } from "react";

const QuoteForm = (props) => {
  const [inState, setInState] = useState("");
  const [state, setState] = useState("");
  const [previousCustomer, setPreviousCustomer] = useState("");
  const [lastPurchase, setLastPurchase] = useState("");
  const [gallons, setGallons] = useState("");
  const [name, setName] = useState("");
  const [profitMargin, setProfitMargin] = useState("");
  
  const handleInStateChange = (event) => {
    setInState(event.target.value);
    // console.log(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
    // console.log(event.target.value);
  }
  const handlePreviousCustomerChange = (event) => {
    setPreviousCustomer(event.target.value);
    // console.log(event.target.value);
  };

  const handleLastPurchaseChange = (event) => {
    setLastPurchase(event.target.value);
    // console.log(event.target.value);
  }

  const handleGallonsChange = (event) => {
    setGallons(event.target.value);
    // console.log(event.target.value);
  }
  const handleNameChange = (event) => {
    setName(event.target.value);
    // console.log(event.target.value);
  };

  const handleProfitMarginChange = (event) => {
    setProfitMargin(event.target.value);
    // console.log(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("inState:", inState);
    console.log("state:", state);
    console.log("previousCustomer:", previousCustomer);
    console.log("lastPurchase:", lastPurchase);
    console.log("gallons:", gallons);
    console.log("name:", name);
    console.log("profitMargin:", profitMargin);
  };

  return (
    <div className="bigform">
      <form onSubmit={handleSubmit}>
        <h2 className="inline">Request a quote</h2>
        <h5>Please fill out the following: </h5>
        <div>
          <p>Are you in-state?</p>
          <input
            className="textarea"
            type="inState"
            id="inState"
            name="inState"
            placeholder="No"
            value={inState}
            onChange={handleInStateChange}
            required
          />
        </div>
        <div>
          <p>Which state are you requesting from?</p>  
          <input
            className="textarea"
            type="state"
            id="state"
            name="state"
            placeholder=""
            value={state}
            onChange={handleStateChange}
            required
          />
        </div>
        <div>
          <p>Have you purchased fuel before?</p>  
          <input
            className="textarea"
            type="previousCustomer"
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
            type="lastPurchase"
            id="lastPurchase"
            name="lastPurchase"
            placeholder=""
            value={lastPurchase}
            onChange={handleLastPurchaseChange}
            required
          />
        </div>
        <div>
          <p>How many gallons do you plan to purchase?</p>  
          <input
            className="textarea"
            type="gallons"
            id="gallons"
            name="gallons"
            placeholder=""
            value={gallons}
            onChange={handleGallonsChange}
            required
          />
        </div>
        <div>
          <p>Organization Name</p>  
          <input
            className="textarea"
            type="name"
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
            type="profitMargin"
            id="profitMargin"
            name="profitMargin"
            placeholder=""
            value={profitMargin}
            onChange={handleProfitMarginChange}
            required
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
