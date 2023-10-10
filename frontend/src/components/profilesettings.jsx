import { BrowserRouter as Router, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../settings.css";
import userService from "../services/users";

const ProfileSettings = (props) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  // Profile Info Functions
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const handleFirstNameChange = (event) => {
    setFirst(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLast(event.target.value);
  };

  const handleAddress1Change = (event) => {
    setAddress1(event.target.value);
  };

  const handleAddress2Change = (event) => {
    setAddress2(event.target.value);
  };

  const handleCityChange = (event) => {
      setCity(event.target.value);
  };

  const handleStateChange = (event) => {
      setState(event.target.value);
  };
  
  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updateProfObj = {
      firstName: firstName,
      lastName: lastName,
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      zipCode: zipCode,
    };

    console.log("User input: ");
    console.log("First name: ", firstName);
    console.log("Last name: ", lastName);
    console.log("Address 1: ", address1);
    console.log("Address 2: ", address2);
    console.log("State: ", state);
    console.log("Zip Code: ", zipCode);

    try {
      const token = localStorage.getItem("token");
      // Make the API call with the token in the headers
      userService.updateProfile(updateProfObj, {})
        .then(response => {
          if (response.status === 200) {
            console.log(response.data.message);
            if (response.data.isProfileComplate === true) {
              console.log("isProfileComplate: true");
              navigate("/home");
            } else {
              console.log("isProfileComplate: false");
            }
          }
        })
        .catch(error => {
          console.error("Error updating profile: ", error);
          // Handle error here
        });
    } catch (error) {
      console.error("Error updating profile: ", error);
      // Handle error here
    }
  };

  return (
    <div className="gradient-background">
      <div className="main-container">
        <div id="settings-tabs">
          <ul className="no-bullets">
            <li id="settings">Settings</li>

            <li>
              <button className="settings-button"> Profile</button>
            </li>

            <li>
              <Link to="/accountsettings">
                <button className="settings-button"> Account Info</button>
              </Link>
            </li>
          </ul>
        </div>
        <div className="settings-container">
          <div className="settingsTop">
            <div>
              <h1>Complete your profile</h1>
            </div>
            <div>
              <Link to="/home">
                <button className="home-button"> Return to home</button>
              </Link>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="first">First Name</label>
              <input
                className="textarea"
                type="text"
                id="first"
                name="first"
                pattern="[A-Za-z]*"
                value={firstName}
                onChange={handleFirstNameChange}
                required
                maxLength="25"
              />
            </div>
            <div>
              <label htmlFor="last">Last Name</label>
              <input
                className="textarea"
                type="text"
                id="last"
                name="last"
                pattern="[A-Za-z]*"
                value={lastName}
                onChange={handleLastNameChange}
                required
                maxLength="25"
              />
            </div>
            <div>
              <label htmlFor="address1">Address</label>
              <input
                className="textarea"
                type="text"
                id="address1"
                name="address1"
                pattern="[0-9]+[ ]+[A-Za-z]+[ ]+[A-Za-z]*[.]?"
                value={address1}
                onChange={handleAddress1Change}
                required
                maxLength="50"
              />
            </div>
            <div>
              <label htmlFor="address2">Address Line 2 (Optional)</label>
              <input
                className="textarea"
                type="text"
                id="address2"
                name="address2"
                pattern="[A-Za-z]*[.]?[ ]+[0-9]"
                value={address2}
                onChange={handleAddress2Change}
                maxLength="50"
              />
            </div>
            <div>
              <label htmlFor="city">City</label>
                <input
                  className="textarea"
                  type="text"
                  id="city"
                  name="city"
                  pattern="[A-Za-z]*"
                  value={city}
                  onChange={handleCityChange}
                  maxLength="25"
                />
            </div>

            <div>
              <label htmlFor="state">State</label>
              <select
                id="state"
                name="state"
                value={state}
                onChange={handleStateChange}
                required
              >
                <option value=""> </option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
            </div>
            <div>
              <label htmlFor="zipCode">Zip Code</label>
              <input
                className="textarea"
                type="text"
                id="zipCode"
                name="zipCode"
                pattern="[0-9]{5,9}"
                value={zipCode}
                onChange={handleZipCodeChange}
                maxLength="9"
                minLength="5"
                required
              />
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


export default ProfileSettings;
