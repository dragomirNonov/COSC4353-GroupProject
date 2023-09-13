import LoginForm from "../components/login";
import RegisterForm from "../components/register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <div className="body">
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
