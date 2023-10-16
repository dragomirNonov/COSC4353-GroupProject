import { BrowserRouter as Router, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import userService from "../services/users";

const Profile = (props) => {
    var [errorMessage, setErrorMessage] = useState("");
    var [pName, setPName] = useState("");
    var [pAddress, setPAddress] = useState("");

    
    const [user, setUser] = useState({
        name: "",
        address: "",
        cityStateZip: "",
    });

    useEffect(() => {
        userService.getUserProf().then((res) => {
            if(res.status === 200) {
                setErrorMessage("");
                var { firstName, lastName, address1, address2, city, state, zipCode } = res.data.existingProfile;
                !address2 ? address2 = "" : address2;

                if (!firstName && !lastName && !address1 && !city && !state && !zip) {
                    console.log("User profile not complete.");
                    setErrorMessage("Please complete your profile.");
                } else {
                    // Create a user object with the retrieved data
                    const userData = {
                        name: `${firstName} ${lastName}`,
                        address: `${address1} ${address2}`,
                        cityStateZip: `${city}, ${state} ${zipCode}`,
                    };
                    setPName("Name: ");
                    setPAddress("Address: ");
                    setUser(userData);
                }
            }
        })
        .catch((error) => {
            console.error("Error fetching user profile: ", error);
            setErrorMessage("Error fetching profile.");
        });
    }, []);

    return (
        <div className="bigform">
            <div className="profilePage">
                <h1>Your profile</h1>
                    <div className="profileInfo">
                        <div id="errorMessage">{errorMessage}</div>
                        <div className="profileFormat">
                            <p>{pName}</p>
                            <p>{pAddress}</p>
                        </div>
                        <div className="userInfo">
                            <p>{user.name}</p>
                            <p>{user.address} {user.cityStateZip}</p>
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
