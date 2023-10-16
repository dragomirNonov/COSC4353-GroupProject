import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Link } from "react-router-dom";
import userService from "../services/users";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginObj = { username: username, password: password };
    userService
      .login(loginObj)
      .then((res) => {
        if (res.status == 200) {
          localStorage.setItem("token", res.data.token);
          console.log(res.data);
          if (res.data.isProfileComplete == true) {
            navigate("/home");
          } else {
            navigate("/profilesettings");
          }
        }
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h2 className="inline">Login to [...]</h2>
        <div>
          <input
            className="textarea"
            type="text"
            id="name"
            name="name"
            placeholder="Email or username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <input
            className="textarea"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <p className="text">Forgot password?</p>
        <div className="error">{errorMessage}</div>
        <button className="button" type="submit">
          Login
        </button>
        <p className="text">
          Don't have an account?{" "}
          <Link className="link-style" to="/register">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
