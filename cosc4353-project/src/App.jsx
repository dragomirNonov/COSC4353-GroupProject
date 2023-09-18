import LoginForm from "./components/login";
import RegisterForm from "./components/register";
import QuoteHistory from "./components/quoteHistory";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <div className="body">
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/columns" element={<QuoteHistory />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
