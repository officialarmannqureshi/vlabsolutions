import "./App.css";

import { Route, Routes } from "react-router-dom";

import AdminRoute from "./components/Routes/AdminRoute";
import PrivateRoute from "./components/Routes/Private";
import AdminAssignments from "./pages/Admin/AdminAssignments";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminPerformance from "./pages/Admin/AdminPerformance";
import AdminStudent from "./pages/Admin/AdminStudent";
import AdminSubmissions from "./pages/Admin/AdminSubmissions";
import CreateAssignments from "./pages/Admin/CreateAssignments";
import LoginPage from "./pages/auth/Login.js";
import SignupPage from "./pages/auth/Signup.js";
import HomePage from "./pages/Home.js";
// import UploadPage from './pages/Upload.js';
import PageNotFound from "./pages/PageNotFound.js";
import PolicyPage from "./pages/Policy.js";
import Assignment from "./pages/user/Assignment";
import Dashboard from "./pages/user/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/profile" element={<AdminDashboard />} />
          <Route path="admin/students" element={<AdminStudent />} />
          <Route path="admin/assignments" element={<AdminAssignments />} />
          <Route path="admin/performance" element={<AdminPerformance />} />
          <Route path="admin/submissions" element={<AdminSubmissions />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/policy" element={<PolicyPage />} />
        <Route path="/create-assignment" element={<CreateAssignments />} />
        <Route path="/pagenotfound" element={<PageNotFound />} />
        <Route path="/assignments" element={<Assignment />} />
      </Routes>
    </>
  );
}

export default App;
