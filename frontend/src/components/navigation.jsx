import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./profile";
import Account from "./accountinfo";
import QuoteForm from "./quoteform";
import QuoteHistory from "./quotehistory";

const Navigation = () => {
  const [component, setComponent] = useState(<Profile />);
  const navigate = useNavigate();

  const setActiveCmponents = (component) => {
    setComponent(component);
  };
  const handleLogout = (event) => {
    localStorage.clear();
    window.location.reload();
  };
  //Checks if token is present, if not redirects to login
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      // Redirect to the login page
      navigate("/");
    }
  }, [navigate]);

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
            <button onClick={handleLogout} className="logout-button">
              Log out
            </button>
          </div>
        </div>
      </div>
      {component}
    </div>
  );
};

export default Navigation;
