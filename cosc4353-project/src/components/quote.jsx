/*
const Quote = (props) => {
  return (
    <div className="main-div">
      <div className="main-sub-div">
        <button className="quote-button">View Quote</button>
        <div className="sub-div">
          <p className="quote-p grey">State:</p>
          <p className="quote-p grey">Company/Org:</p>
          <p className="quote-p grey">Gallons:</p>
          <p className="quote-p grey">Fuel rates:</p>
        </div>
        <div className="sub-div">
          <p className="quote-p grey">TX</p>
          <p className="quote-p grey">Bussiness</p>
          <p className="quote-p grey">680</p>
          <p className="quote-p grey">$3.458</p>
        </div>
        <div className="sub-div">
          <p className="quote-p grey">Request dates:</p>
          <p className="quote-p">Quote price:</p>
          <p className="quote-p">Purchased:</p>
        </div>
        <div className="sub-div">
          <p className="quote-p grey">01/23/2015</p>
          <p className="quote-p">$603.265</p>
          <p className="quote-p">Yes</p>
        </div>
      </div>
    </div>
  );
};
*/

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
          <p className="quote-p grey">{props.object.deliveryAddress}</p>
          <p className="quote-p grey">{props.object.gallons}</p>
          <p className="quote-p grey">{props.object.fuelRate}</p>
        </div>
        <div className="sub-div">
          <p className="quote-p grey">Request Date:</p>
          <p className="quote-p grey">Deliver Date:</p>
          <p className="quote-p">Fuel Rate:</p>
        </div>
        <div className="sub-div">
          <p className="quote-p grey">{props.object.requestDate}</p>
          <p className="quote-p grey">{props.object.deliveryDate}</p>
          <p className="quote-p">{props.object.fuelRate}</p>
        </div>
      </div>
    </div>
  );
};



export default Quote;
