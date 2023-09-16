import { useState } from "react";
import QuoteForm from "./quoteform";
const Navigation = () => {
  const [component, setComponent] = useState(null);

  const setActiveCmponents = (component) => {
    setComponent(component);
  };

  return (
    <div className="navform">
      <div className="nav">
        <div className="nav2">
          <ul>
            <li>
              <button
                className="nav-button"
                onClick={() => setActiveCmponents()}
              >
                Profile
              </button>
            </li>
            <li>
              <button
                className="nav-button"
                onClick={() => setActiveCmponents(null)}
              >
                Account info
              </button>
            </li>
            <li>
              <button
                className="nav-button"
                onClick={() => setActiveCmponents(<QuoteForm />)}
              >
                Request a quote
              </button>
            </li>
          </ul>
        </div>
      </div>
      {component}
    </div>
  );
};

export default Navigation;
