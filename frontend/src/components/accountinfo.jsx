import { BrowserRouter as Router, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import userService from "../services/users";

const Account = (props) => {
    const [user, setUser] = useState({
        userName: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        userService.getUserProf().then((res) => {
            const { username, email, password } = res.data.user;

            // Create a user object with the retrieved data
            const userData = {
                userName: username,
                email: email,
                password: password,
            };

            setUser(userData);
        })
        .catch((error) => {
            console.error("Error fetching user account: ", error);
        });
    }, []);

  return (
    <div className="bigform">
        <div className="profilePage">
            <h1>Your account info</h1>
                <div className="profileInfo">
                    <div className="profileFormat">
                        <p>Username: </p>
                        <p>Email: </p>
                        <p>Password: </p>
                    </div>
                    <div className="userInfo">
                        <p>{user.userName}</p>
                        <p>{user.email}</p>
                        <p>••••••••••••</p>
                    </div>
                </div>
            <Link to="/accountsettings">
                <button className="editSettings">
                Edit Account
                </button>
            </Link>
            
        </div>
    </div>
  );
};

export default Account;
