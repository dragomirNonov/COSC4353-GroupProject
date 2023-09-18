import { useState } from "react";
import QuoteForm from "./quoteform";
import Quote from "./quote";
import QuoteHistory from "./quotehistory";

const Navigation = () => {
  const [component, setComponent] = useState(null);

  const setActiveCmponents = (component) => {
    setComponent(component);
  };

  return (
    <div className="navform">
      <div className="nav">
        <div className="nav2">
          <div className="nav-bar">
            <button className="nav-button" onClick={() => setActiveCmponents()}>
              Profile
            </button>
            <button
              className="nav-button"
              onClick={() => setActiveCmponents(null)}
            >
              Account info
            </button>
            <button
              className="nav-button"
              onClick={() => setActiveCmponents(<QuoteForm />)}
            >
              Request a quote
            </button>
            <button
              className="nav-button"
              onClick={() => setActiveCmponents(<QuoteHistory />)}
            >
              View Quote History
            </button>
          </div>
        </div>
      </div>
      {component}
    </div>
  );
};

export default Navigation;
