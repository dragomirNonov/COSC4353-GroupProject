import { BrowserRouter as Router, Link } from "react-router-dom";
import { useState } from "react";

const Profile = (props) => {

    {/*Replace with real API fetch*/}
    const firstName = "John";
    const lastName = "Smith";
    const address1 = "11 Street Dr.";
    const address2 = "";
    const city = "Houston";
    const state = "TX";
    const zipCode = "77777";
    const business ="Busniess Organization";

    const userData = {
        name: firstName + " " + lastName,
        address: address1 + " " + address2,
        cityStateZip: city + ", " + state + " " + zipCode,
        business: business
    };

    const [user, setUserData] = useState(userData);

  return (
    <div className="bigform">
        <div className="profilePage">
            <h1>Your profile</h1>
                <div className="profileInfo">
                    <div className="profileFormat">
                        <p>Name: </p>
                        <p>Address: </p>
                        <p>Business/Organization: </p>
                    </div>
                    <div className="userInfo">
                        <p>{user.name}</p>
                        <p>{user.address} {user.cityStateZip}</p>
                        <p>{user.business}</p>
                    </div>
                </div>
            <Link to="/profilesettings">
                <button className="editSettings">
                Edit Profile
                </button>
            </Link>
            
        </div>
    </div>
  );
};

export default Profile;
