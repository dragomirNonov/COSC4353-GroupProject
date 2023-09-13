import { BrowserRouter as Router, Link } from "react-router-dom";
const LoginForm = (props) => {
  return (
    <div className="form">
      <form onSubmit={props.handleSubmit}>
        <h2 className="inline">Login to [...]</h2>
        <div>
          <input
            className="textarea"
            type="text"
            id="name"
            name="name"
            placeholder="Email or username"
            // value={"username"}
            // onChange={props.handleInputChange}
            required
          />
        </div>
        <div>
          <input
            className="textarea"
            type="email"
            id="email"
            name="email"
            placeholder="Password"
            // value={"password"}
            // onChange={props.handleInputChange}
            required
          />
        </div>
        <p className="text">Forgot password?</p>
        <button className="button" type="submit">
          Login
        </button>
        <p className="text">
          Dont have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
