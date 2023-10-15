import './App.css';
import {Routes,Route} from 'react-router-dom';
import HomePage from './pages/Home.js';
import LoginPage from './pages/auth/Login.js';
import PolicyPage from './pages/Policy.js';
import SignupPage from './pages/auth/Signup.js';
// import UploadPage from './pages/Upload.js';
import PageNotFound from './pages/PageNotFound.js';
import Dashboard from './pages/user/Dashboard';
import Workspace from './pages/user/Workspace';
import PrivateRoute from './components/Routes/Private';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminStudent from './pages/Admin/AdminStudent';
import CreateAssignments from './pages/Admin/CreateAssignments';
import AdminAssignments from './pages/Admin/AdminAssignments';
import AdminPerformance from './pages/Admin/AdminPerformance';
import AdminSubmissions from './pages/Admin/AdminSubmissions';
import Assignment from './pages/user/Assignment';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/dashboard' element={<PrivateRoute />}>
      <Route path="user" element={<Dashboard/>}/>
      
      
      </Route>
      <Route path='/dashboard' element={<AdminRoute/>}>
      <Route path="admin" element={<AdminDashboard/>}/>
      <Route path="admin/profile" element={<AdminDashboard/>}/>
      <Route path="admin/students" element={<AdminStudent/>}/>
      <Route path="admin/assignments" element={<AdminAssignments/>}/>
      <Route path="admin/performance" element={<AdminPerformance/>}/>
      <Route path="admin/submissions" element={<AdminSubmissions/>}/>
      </Route>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<SignupPage/>}/>
      <Route path='/policy' element={<PolicyPage/>}/>
      <Route path='/create-assignment' element={<CreateAssignments/>}/>
      <Route path='/pagenotfound' element={<PageNotFound/>}/>
      <Route path='/assignments' element={<Assignment/>}/>
      <Route path='/Workspace' element={<Workspace/>}/>
    </Routes>
    </>
  );
}

export default App;
