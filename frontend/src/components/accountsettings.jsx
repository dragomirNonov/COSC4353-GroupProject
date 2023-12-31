import { BrowserRouter as Router, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../settings.css";
import userService from "../services/users";
import { useNavigate } from "react-router-dom";

const AccountSettings = (props) => {
  var [inputError, setInputError] = useState(false);
  var [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var [message, setMessage] = useState("");
  var [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleEmailChange = (event) => {
    let emailInput = event.target;
    emailInput.classList.remove("invalid-input");
    setEmail(event.target.value);
    setMessage("");
    setErrorMessage("");
  };

  const handleEmailBlur = (event) => {
    let emailInput = event.target;

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;

    if (!emailPattern.test(event.target.value) && event.target.value !== "") {
      console.log("Bad email input.");
      setMessage("");
      setErrorMessage("Invalid input.");
      emailInput.classList.add("invalid-input");
      setInputError(true);
    } else {
      setEmail(event.target.value);
      setMessage("");
      setInputError(false);
    }
  };

  const handlePasswordChange = (event) => {
    setMessage("");
    setErrorMessage("");
    setPassword(event.target.value);
    //console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let emailInput = document.getElementById("email");
    let passwordInput = document.getElementById("password");
    console.log("Input error: ", inputError);

    // If form is not empty and emailInput matches pattern
    if (
      !inputError &&
      !(emailInput.value === "" && passwordInput.value === "")
    ) {
      const updateAccObj = {
        email: email,
        password: password,
      };

      try {
        // Make the API call with the token in the headers
        userService
          .updateAccount(updateAccObj, {})
          .then((response) => {
            if (response.status === 200) {
              console.log(response.data.message);
              setMessage(response.data.message);
            }
          })
          .catch((error) => {
            console.error("Error updating account: ", error);
            setErrorMessage(error.response.data.message);
          });
      } catch (error) {
        console.error("Error updating account: ", error);
        setErrorMessage("Error updating account.");
      }
      setMessage("");
      setErrorMessage("");
    } else {
      inputError
        ? setErrorMessage("Invalid input.")
        : setErrorMessage(
            "Please enter a new email or password to update your account."
          );
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      // Redirect to the login page
      navigate("/");
    }
  }, [navigate]);
  return (
    <div className="gradient-background">
      <div className="main-container">
        <div id="settings-tabs">
          <ul className="no-bullets">
            <li id="settings">Settings</li>
            <li>
              <Link to="/profilesettings">
                <button className="settings-button"> Profile</button>
              </Link>
            </li>
            <li>
              <button className="settings-button"> Account Info</button>
            </li>
          </ul>
        </div>

        <div className="settings-container">
          <div className="settingsTop">
            <div>
              <h1>Edit your account</h1>
            </div>
            <div>
              <Link to="/home">
                <button className="home-button"> Return to home</button>
              </Link>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
              />
            </div>
            <div>
              <div id="password-container">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  name="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
            <div id="message-container">
              <button className="save-button" type="submit">
                Save
              </button>
              <div id="message">{message}</div>
              <div id="errorMessage">{errorMessage}</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
