import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./profile";
import Account from "./accountinfo";
import QuoteForm from "./quoteform";
import Quote from "./quote";
import QuoteHistory from "./quotehistory";
import axios from "axios";

const Navigation = () => {
  const [component, setComponent] = useState(<Profile />);
  const navigate = useNavigate();

  const setActiveCmponents = (component) => {
    setComponent(component);
  };

  //TESTING TOKEN*************************************************************
  // Token needs to be sent to headers avery time the axios is called.a
  const baseUrl = "http://localhost:3001/api/users";
  axios
    .get(baseUrl, { headers: { token: localStorage.getItem("token") } })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.status === 401);
      if (err.response.status === 401) {
        navigate("/");
      }
    });
  //************************************************************************** */

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
            
          </div>
        </div>
      </div>
      {component}
    </div>
  );
};

export default Navigation;
