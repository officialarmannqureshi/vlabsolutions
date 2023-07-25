import './App.css';
import {Routes,Route} from 'react-router-dom';
import HomePage from './pages/Home.js';
import LoginPage from './pages/auth/Login.js';
import PolicyPage from './pages/Policy.js';
import SignupPage from './pages/auth/Signup.js';
import UploadPage from './pages/Upload.js';
import PageNotFound from './pages/PageNotFound.js';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/dashboard' element={<PrivateRoute />}>
      <Route path="" element={<Dashboard/>}/>

      </Route>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<SignupPage/>}/>
      <Route path='/policy' element={<PolicyPage/>}/>
      <Route path='/upload' element={<UploadPage/>}/>
      <Route path='/pagenotfound' element={<PageNotFound/>}/>
      
      
    </Routes>
    </>
  );
}

export default App;
