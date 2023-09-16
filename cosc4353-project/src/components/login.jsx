import { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    console.log(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className="form">
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
        <button className="button" type="submit">
          Login
        </button>
        <p className="text">
          Dont have an account?{" "}
          <Link className="link-style" to="/register">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
