import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./Components/AdminLogin/AdminLogin";
import Dashboard from "./Components/Dashboard/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import AddUser from "./Components/AddDataForm/AddUserTable";
import AddBondsman from "./Components/AddDataForm/AddBondsmanForm";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/AddUser" element={<AddUser />} />
          <Route path="/AddBondsman" element={<AddBondsman />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
