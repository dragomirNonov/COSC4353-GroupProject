import LoginForm from "./components/login";
import RegisterForm from "./components/register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/navigation";
import ProfileSettings from "./components/profilesettings";
import AccountSettings from "./components/accountsettings";
//import QuoteHistory from "./components/quotehistory";

const App = () => {
  return (
    <div className="body">
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
//<Route path="/quotehistory" element={<QuoteHistory />} />