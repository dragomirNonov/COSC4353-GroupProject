import { BrowserRouter as Router, Link } from "react-router-dom";
import { useState } from "react";
import userService from "../services/users";

const RegisterForm = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const registerObj = {
      email: email,
      username: username,
      password: password,
    };
    userService
      .register(registerObj)
      .then((res) => {
        setErrorMessage("");
        setSuccessMessage(res.data.message);
        setUsername("");
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        setSuccessMessage("");
        setErrorMessage(err.response.data.message);
      });
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h2 className="inline">Register to [...]</h2>
        <div>
          <input
            className="textarea"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <input
            className="textarea"
            type="text"
            id="name"
            name="name"
            placeholder="Username"
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
        <div className="success">{successMessage}</div>
        <div className="error">{errorMessage}</div>
        <button className="button" type="submit">
          Register
        </button>

        <p className="text">
          Already have an account?{" "}
          <Link className="link-style " to="/">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
