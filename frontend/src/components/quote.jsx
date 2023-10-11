const Quote = (props) => {
  return (
    <div className="main-div">
      <div className="main-sub-div">
        <button className="quote-button">View Quote</button>
        <div className="sub-div">
          <p className="quote-p grey">Delivery Adress:</p>
          <p className="quote-p grey">Gallons:</p>
          <p className="quote-p grey">Fuel Rates:</p>
        </div>

        <div className="sub-div">
          <p className="quote-p grey">{props.userAddress} {props.userAddress2} {props.userAddress3} {props.userAddress4} {props.userAddress5}</p>
          <p className="quote-p grey">{props.object.gallons}</p>
          <p className="quote-p grey">{props.object.fuelRate}</p>
        </div>

        <div className="sub-div">
          <p></p>
          <p className="quote-p grey">Request Date:</p>
          <p className="quote-p grey">Deliver Date:</p>
          {/*<p className="quote-p grey">Purchased:</p>*/}
        </div>

        <div className="sub-div">
          <p></p>
          <p className="quote-p grey">{props.object.requestDate}</p>
          <p className="quote-p grey">{props.object.deliveryDate}</p>
          {/*<p className="quote-p grey">{props.object.purchased}</p> */}
        </div>
      </div>
    </div>
  );
};

export default Quote;
