import LoginForm from "./components/login";
import QuoteForm from "./components/quoteform";
import RegisterForm from "./components/register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <div className="body">
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/request-a-quote" element={<QuoteForm />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
