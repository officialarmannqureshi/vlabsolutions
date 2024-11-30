import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/auth/Login";
import PolicyPage from "./pages/Policy";
import SignupPage from "./pages/auth/Signup";
import PageNotFound from "./pages/PageNotFound";
import Dashboard from "./pages/user/Dashboard";
import Workspace from "./pages/user/Workspace";
import PrivateRoute from "./components/Routes/PrivateRoute";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminStudent from "./pages/Admin/AdminStudent";
import CreateAssignments from "./pages/Admin/CreateAssignments";
import AdminAssignments from "./pages/Admin/AdminAssignments";
import AdminPerformance from "./pages/Admin/AdminPerformance";
import AdminSubmissions from "./pages/Admin/AdminSubmissions";
import Assignment from "./pages/user/Assignment";
import DashboardUser from "./pages/user/DashboardUser";
import AdminAllow from "./pages/Admin/AdminAllow";
import AdminCreateQuizForm from "./pages/Admin/AdminCreateQuizForm";
import AdminCreateQuiz from "./pages/Admin/AdminCreateQuiz";
import AdminCreateQuizFormOutlet from "./pages/Admin/AdminCreateQuizFormOutlet";
import AdminQuizView from "./pages/Admin/AdminQuizView";
import Tests from "./pages/user/Tests";
import axios from 'axios'
function App() {
  const [formDetails, setFormDetails] = useState({});
  //For local host
  // axios.defaults.withCredentials=true;
  // axios.defaults.baseURL = 'http://localhost:7000/';
  //For Vercel deployment
  axios.defaults.withCredentials=true;
  axios.defaults.baseURL = 'https://vlabsolutions-api.vercel.app/';
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<HomePage />} />
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="user" element={<DashboardUser />} />
          </Route>
          <Route path="assignments" element={<Assignment />} />
          <Route path="Workspace" element={<Workspace />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="tests" element={<Tests />} />
        </Route>

        <Route path="/admin" element={<AdminRoute />}>
          <Route path="dashboard" element={<AdminAllow />}>
            <Route path="profile" element={<AdminDashboard />} />
            <Route path="students" element={<AdminStudent />} />
            <Route path="assignments" element={<AdminAssignments />} />
            <Route path="quizview" element={<AdminQuizView/>}/>
            <Route path="performance" element={<AdminPerformance />} />
            <Route path="submissions" element={<AdminSubmissions />} />
          </Route>

          <Route path="create-quiz" element={<AdminCreateQuizFormOutlet />}>
            <Route
              index
              element={<AdminCreateQuizForm onFormSubmit={setFormDetails} />}
            />
            <Route
              path="quiz"
              element={<AdminCreateQuiz formDetails={formDetails} />}
            />
          </Route>
          <Route path="create-assignment" element={<CreateAssignments />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/policy" element={<PolicyPage />} />
        <Route path="/pagenotfound" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
