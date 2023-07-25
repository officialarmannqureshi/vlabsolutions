import React from 'react'
import {NavLink,Link} from 'react-router-dom';
import {} from 'react-icons';
import {SiSaucelabs} from 'react-icons/si';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
const Header = () => {
  const [auth,setAuth] =useAuth();
  const handleLogout =()=>{
    setAuth({
      ...auth,
      user:null,
      token:''
    })

    localStorage.removeItem('auth');
    toast.success('User logged out successfully',{
      success:{
        duration:60,
      }
    });
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link 
    className="navbar-brand"
    to="/"
    style={{textDecoration: 'none'}} 
    >
    <SiSaucelabs className='icon'/>  V-lab Solutions
    </Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink to="/" 
          className="nav-link"
          style={({isActive})=>({
            color:isActive ? 'black':'gray',
            textDecoration: 'none',
            
          })}
          >Home</NavLink>
        </li>
        
        <li className="nav-item">
          <NavLink to="/upload"
           className="nav-link"
           style={({isActive})=>({
            color:isActive ? 'black':'gray',
            textDecoration: 'none',
          })}
           >Upload</NavLink>
        </li>
        {
          !auth.user ?(<><li className="nav-item">
          <NavLink to="/login" 
          className="nav-link"
          style={({isActive})=>({
            color:isActive ? 'black':'gray',
            textDecoration: 'none',
          })}
          >Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/register" 
          className="nav-link"
          style={({isActive})=>({
            color:isActive ? 'black':'gray',
            textDecoration: 'none',
          
          })} >Register</NavLink>
        </li></>):(
        <>
        <li className="nav-item">
          <NavLink to="/login" 
          onClick={handleLogout}
          className="nav-link"
          style={({isActive})=>({
            color:isActive ? 'black':'gray',
            textDecoration: 'none',
          
          })} >Logout</NavLink></li>
        </>
        
        )
        }
        
        
      </ul>
     
    </div>
  </div>
</nav>
    </>
  )
}

export default Header
