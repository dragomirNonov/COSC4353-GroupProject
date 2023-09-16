import LoginForm from "./components/login";
import RegisterForm from "./components/register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/navigation";
const App = () => {
  return (
    <div className="body">
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/home" element={<Navigation />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
