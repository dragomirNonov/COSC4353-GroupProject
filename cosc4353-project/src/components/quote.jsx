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

export default Quote;
