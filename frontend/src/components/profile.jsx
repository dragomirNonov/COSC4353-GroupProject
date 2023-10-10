import { BrowserRouter as Router, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import userService from "../services/users";

const Profile = (props) => {
    const [user, setUser] = useState({
        name: "",
        address: "",
        cityStateZip: "",
    });

    useEffect(() => {
        userService.getUserProf().then((res) => {
            const { firstName, lastName, address1, address2, city, state, zip } = res.data.user;

            console.log("FIrst name: ", firstName);

            // Create a user object with the retrieved data
            const userData = {
                name: `${firstName} ${lastName}`,
                address: `${address1} ${address2}`,
                cityStateZip: `${city}, ${state} ${zip}`,
            };

            setUser(userData);
        })
        .catch((error) => {
            console.error("Error fetching user info: ", error);
        });
    }, []);

    return (
        <div className="bigform">
            <div className="profilePage">
                <h1>Your profile</h1>
                    <div className="profileInfo">
                        <div className="profileFormat">
                            <p>Name: </p>
                            <p>Address: </p>
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
