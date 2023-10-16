import { BrowserRouter as Router, Link } from "react-router-dom";
import { useState } from "react";
import "../settings.css";
import userService from "../services/users";

const ProfileSettings = (props) => {
  var [firstError, setFirstError] = useState(true);
  var [lastError, setLastError] = useState(true);
  var [address1Error, setAddress1Error] = useState(true);
  var [address2Error, setAddress2Error] = useState(false);
  var [cityError, setCityError] = useState(true);
  var [stateError, setStateError] = useState(true);
  var [zipError, setZipError] = useState(true);


  var [message, setMessage] = useState("");
  var [errorMessage, setErrorMessage] = useState("");

  // Profile Info Functions
  var [firstName, setFirst] = useState("");
  var [lastName, setLast] = useState("");
  var [address1, setAddress1] = useState("");
  var [address2, setAddress2] = useState("");
  var [city, setCity] = useState("");
  var [state, setState] = useState("");
  var [zipCode, setZipCode] = useState("");

  const handleFirstNameChange = (event) => {
    let firstInput = event.target;
    firstInput.classList.remove("invalid-input");
    setFirst(event.target.value);
    setErrorMessage("");
  };

  const handleFirstBlur = (event) => {
    let nameInput = event.target;
    
    const namePattern = /^[A-Za-z]{1,25}$/;

    if (!namePattern.test(event.target.value) || event.target.value === "") {
      console.log("Bad name input.");
      setMessage('');
      setErrorMessage('Invalid first name.');
      nameInput.classList.add("invalid-input");
      setFirstError(true);
    } else {
      setMessage('');
      setFirstError(false);
    }
  }

  const handleLastNameChange = (event) => {
    let lastInput = event.target;
    lastInput.classList.remove("invalid-input");
    setLast(event.target.value);
    setErrorMessage("");
  };

  const handleLastBlur = (event) => {
    let nameInput = event.target;
    
    const namePattern = /^[A-Za-z]{1,25}$/;

    if (!namePattern.test(event.target.value) || event.target.value === "") {
      console.log("Bad name input.");
      setMessage('');
      setErrorMessage('Invalid last name.');
      nameInput.classList.add("invalid-input");
      setLastError(true);
    } else {
      setMessage('');
      setLastError(false);
    }
  }

  const handleAddress1Change = (event) => {
    let address1Input = event.target;
    address1Input.classList.remove("invalid-input");
    setAddress1(event.target.value);
    setErrorMessage("");
  };

  const handleAddress1Blur = (event) => {
    let address1Input = event.target;
    
    const address1Pattern = /^(?=\S*\s)(?=[^a-zA-Z]*[a-zA-Z])(?=\D*\d)[a-zA-Z\d\s',.#/-]*$/;

    if (!address1Pattern.test(event.target.value) || event.target.value === "") {
      console.log("Bad address 1 input.");
      setMessage('');
      setErrorMessage('Invalid address 1.');
      address1Input.classList.add("invalid-input");
      setAddress1Error(true);
    } else {
      setMessage('');
      setAddress1Error(false);
    }
  }

  const handleAddress2Change = (event) => {
    setMessage("");
    let address2Input = event.target;
    address2Input.classList.remove("invalid-input");
    setAddress2(event.target.value);
    setErrorMessage("");
  };

  const handleAddress2Blur = (event) => {
    let address2Input = event.target;
    
    const address2Pattern = /^[A-Za-z]*[.]?[ ]+[0-9]*$/;

    if (!address2Pattern.test(event.target.value) && event.target.value !== "") {
      console.log("Bad address 2 input.");
      setMessage('');
      setErrorMessage('Invalid address 2.');
      address2Input.classList.add("invalid-input");
      setAddress2Error(true);
    }
    else {
      setMessage('');
      setAddress2Error(false);
    }
  }

  const handleCityChange = (event) => {
    let cityInput = event.target;
    cityInput.classList.remove("invalid-input");
    setCity(event.target.value);
    setErrorMessage("");
  };

  const handleCityBlur = (event) => {
    let cityInput = event.target;
    
    const cityPattern = /^[A-Za-z ]{1,25}$/;

    if (!cityPattern.test(event.target.value) || event.target.value === "") {
      console.log("Bad city input.");
      setMessage('');
      setErrorMessage('Invalid city.');
      cityInput.classList.add("invalid-input");
      setCityError(true);
    } else {
      setMessage('');
      setCityError(false);
    }
  }

  const handleStateChange = (event) => {
    let stateInput = event.target;
    stateInput.classList.remove("invalid-input");
    setState(event.target.value);

    if (event.target.value === "") {
      stateInput.classList.add("invalid-input");
      setMessage('');
      setErrorMessage('Please select a state.');
      setStateError(true);
    }
    else {
      setMessage('');
      setStateError(false);
    }
  };
  
  const handleZipCodeChange = (event) => {
    let zipInput = event.target;
    zipInput.classList.remove("invalid-input");
    setZipCode(event.target.value);
    setErrorMessage("");
  };

  const handleZipBlur = (event) => {
    let zipInput = event.target;
    
    const zipPattern = /[0-9]{5,9}/;

    if (!zipPattern.test(event.target.value) || event.target.value === "") {
      console.log("Bad zip code input.");
      setMessage('');
      setErrorMessage('Invalid zip.');
      zipInput.classList.add("invalid-input");
      setZipError(true);
    } else {
      setMessage('');
      setZipError(false);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage("");
    setMessage("");

    console.log("First name error: ", firstError);
    console.log("Last name error: ", lastError);
    console.log("Add1 error: ", address1Error);
    console.log("Add2 error: ", address2Error);
    console.log("City error: ", cityError);
    console.log("State error: ", stateError);
    console.log("Zip error: ", zipError);

    if (!firstError && !lastError && !address1Error && !address2Error && !cityError && !stateError && !zipError) {
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
        // Make the API call with the token in the headers
        userService.updateProfile(updateProfObj, {})
          .then(response => {
            if (response.status === 200) {
              console.log(response.data.message);
              if (response.data.isProfileComplete === true) {
                console.log("isProfileComplete: true");
                setMessage("Profile updated successfully")
              } else {
                console.log("isProfileComplete: false");
                setErrorMessage("Error updating profile.");
              }
            }
          })
          .catch(error => {
            console.error("Error updating profile: ", error);
            setErrorMessage("Error updating profile.");
          });
      } catch (error) {
        console.error("Error updating profile: ", error);
        setErrorMessage("Error updating profile.");
      }
    }
    else {
      setErrorMessage("Invalid input.");
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
                type="text"
                id="first"
                name="first"
                value={firstName}
                onChange={handleFirstNameChange}
                onBlur={handleFirstBlur}
                maxLength="25"
              />
            </div>
            <div>
              <label htmlFor="last">Last Name</label>
              <input
                type="text"
                id="last"
                name="last"
                value={lastName}
                onChange={handleLastNameChange}
                onBlur={handleLastBlur}
                maxLength="25"
              />
            </div>
            <div>
              <label htmlFor="address1">Address</label>
              <input
                type="text"
                id="address1"
                name="address1"
                value={address1}
                onChange={handleAddress1Change}
                onBlur={handleAddress1Blur}
                maxLength="100"
              />
            </div>
            <div>
              <label htmlFor="address2">Address Line 2 (Optional)</label>
              <input
                type="text"
                id="address2"
                name="address2"
                value={address2}
                onChange={handleAddress2Change}
                onBlur={handleAddress2Blur}
                maxLength="100"
              />
            </div>
            <div>
              <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={city}
                  onChange={handleCityChange}
                  onBlur={handleCityBlur}
                  maxLength="100"
                />
            </div>

            <div>
              <label htmlFor="state">State</label>
              <select
                id="state"
                name="state"
                value={state}
                onChange={handleStateChange}
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
                type="text"
                id="zipCode"
                name="zipCode"
                value={zipCode}
                onChange={handleZipCodeChange}
                onBlur={handleZipBlur}
                maxLength="9"
                minLength="5"
              />
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


export default ProfileSettings;
