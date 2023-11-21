import LoginForm from "./components/login";
import RegisterForm from "./components/register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navigation from "./components/navigation";
import ProfileSettings from "./components/profilesettings";
import AccountSettings from "./components/accountsettings";

const App = () => {
  const handleLogout = (event) => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div className="body">
      <div className="container">
        <button onClick={handleLogout} className="logout-button">
          Log out
        </button>
      </div>

      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/home" element={<Navigation />} />
          <Route path="/profilesettings" element={<ProfileSettings />} />
          <Route path="/accountsettings" element={<AccountSettings />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
