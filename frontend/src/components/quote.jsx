const Quote = (props) => {
  return (
    <div className="main-div">
      <div className="main-sub-div">
        <button className="quote-button"> Quote No. {props.index + 1}</button>
        <div className="sub-div">
          <p className="quote-p grey">Delivery Address:</p>
          <p className="quote-p grey">Gallons:</p>
          <p className="quote-p grey">Fuel Rates:</p>
        </div>

        <div className="sub-div">
          <p className="quote-p grey">
            {props.userAddress} {props.userAddress2} {props.userAddress3}{" "}
            {props.userAddress4} {props.userAddress5}
          </p>
          <p className="quote-p grey">{props.object.gallons}</p>
          <p className="quote-p grey">{props.object.fuelRate}</p>
        </div>

        <div className="sub-div">
          <p></p>
          <p className="quote-p grey">Request Date:</p>
          <p className="quote-p grey">Delivery Date:</p>
        </div>

        <div className="sub-div">
          <p></p>
          <p className="quote-p grey">
            {props.object.requestDate.split("T")[0]}
          </p>
          <p className="quote-p grey">
            {props.object.deliveryDate.split("T")[0]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Quote;
