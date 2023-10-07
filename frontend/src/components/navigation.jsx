import { useState } from "react";
import Profile from "./profile";
import Account from "./accountinfo";
import QuoteForm from "./quoteform";
import Quote from "./quote";
import QuoteHistory from "./quotehistory";

const Navigation = () => {
  const [component, setComponent] = useState(<Profile />);

  const setActiveCmponents = (component) => {
    setComponent(component);
  };

  return (
    <div className="navform">
      <div className="nav">
        <div className="nav2">
          <div className="nav-bar">
            <button
              className="nav-button"
              onClick={() => setActiveCmponents(<Profile />)}
            >
              Profile
            </button>
            <button
              className="nav-button"
              onClick={() => setActiveCmponents(<Account />)}
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
