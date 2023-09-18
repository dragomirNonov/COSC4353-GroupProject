import { BrowserRouter as Router, Link } from "react-router-dom";
import { useState } from "react";

const RegisterForm = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    // console.log(event.target.value);
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    // console.log(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    // console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Username:", username);
    console.log("Password:", password);
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
