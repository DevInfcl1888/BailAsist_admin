import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./Components/AdminLogin/AdminLogin";
import Dashboard from "./Components/Dashboard/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import AddUser from "./Components/AddDataForm/AddUserTable";
import AddBondsman from "./Components/AddDataForm/AddBondsmanForm";
import UpdateUser from "./Components/AddDataForm/updateUserForm";

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
          <Route
            path="/AddUser"
            element={
              <ProtectedRoute>
                <AddUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AddBondsman"
            element={
              <ProtectedRoute>
                <AddBondsman />
              </ProtectedRoute>
            }
          />
          <Route
            path="/UpdateUser"
            element={
              <ProtectedRoute>
                <UpdateUser />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/UpdateBondsman"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
