import React from 'react'
import toast from 'react-hot-toast';
import {} from 'react-icons';
import {SiSaucelabs} from 'react-icons/si';
import {Link, NavLink} from 'react-router-dom';

import {useAuth} from '../../context/auth';

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
        
        {auth?.user?.role===0 ?<li className="nav-item">
          <NavLink to="/Workspace" 
          className="nav-link"
          style={({isActive})=>({
            color:isActive ? 'black':'gray',
            textDecoration: 'none',
            
          })}
          >Workspace</NavLink>
        </li> :<li></li>}
    
        
         { auth?.user?.role===1?
          <li className="nav-item">
          <NavLink to="/create-assignment"
            className="nav-link"
            style={({isActive})=>({
            color:isActive ? 'black':'gray',
            textDecoration: 'none',
          })
          }
      >Create Assignments</NavLink>
          </li>:<li></li>
      
        }
        { auth?.user?.role===0?
          <li className="nav-item">
          <NavLink to="/assignments"
            className="nav-link"
            style={({isActive})=>({
            color:isActive ? 'black':'gray',
            textDecoration: 'none',
          })
          }
      >Assignments</NavLink>
          </li>:<li></li>
      
        }
        
        
        
 

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
        <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
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
