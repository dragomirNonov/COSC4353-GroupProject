import { BrowserRouter as Router, Link } from "react-router-dom";
import { useState } from "react";
import ProfileSettings from "./profilesettings";
import "../settings.css";

const AccountSettings = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    //console.log(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    //console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(event.target.value);
    //console.log(event.target.value);
  };

  // Go To Profile Settings Function

  //   const [settingsPage, setSettingsPage] = useState("");

  //   const setPage = (settingsPage) => {
  //     setSettingsPage = settingsPage;
  //   };

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

        {/* {settingsPage === "profile" && <ProfileSettings />} */}

        <div className="settings-container">
          <h1>Edit your account</h1>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                className="textarea"
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
              />
            </div>
            <div>
              <div id="password-container">
                <label htmlFor="password">Password</label>
                <input
                  className="textarea"
                  type="text"
                  name="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
            <button className="save-button" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
