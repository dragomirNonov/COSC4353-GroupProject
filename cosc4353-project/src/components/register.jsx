import { BrowserRouter as Router, Link } from "react-router-dom";
const RegisterForm = (props) => {
  return (
    <div className="form">
      <form onSubmit={props}>
        <h2 className="inline">Register to [...]</h2>
        <div>
          <input
            className="textarea"
            type="text"
            id="name"
            name="name"
            placeholder="Email"
            // value={"username"}
            // onChange={props.handleInputChange}
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

        <button className="button" type="submit">
          Register
        </button>

        <p className="text">
          Alredy have an account? <Link to="/">Sign in</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
