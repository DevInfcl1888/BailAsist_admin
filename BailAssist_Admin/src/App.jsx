import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./Components/AdminLogin/AdminLogin";
import Dashboard from "./Components/Dashboard/Dashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
