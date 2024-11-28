import React from "react";
import { NavLink, Link } from "react-router-dom";
import { SiSaucelabs } from "react-icons/si";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

const Header = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });

    localStorage.removeItem("auth");
    toast.success("User logged out successfully", { duration: 6000 });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="/"
            style={{ textDecoration: "none" }}
          >
            <SiSaucelabs className="icon" /> V-lab Solutions
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link"
                  style={({ isActive }) => ({
                    color: isActive ? "black" : "gray",
                    textDecoration: "none",
                  })}
                >
                  Home
                </NavLink>
              </li>
              {auth?.user?.role === 0 ? (
                <li className="nav-item">
                  <NavLink
                    to="/assignments"
                    className="nav-link"
                    style={({ isActive }) => ({
                      color: isActive ? "black" : "gray",
                      textDecoration: "none",
                    })}
                  >
                    Assignments
                  </NavLink>
                </li>
              ) : (
                <li></li>
              )}
              {auth?.user?.role === 0 ? (
                <li className="nav-item">
                  <NavLink
                    to="/tests"
                    className="nav-link"
                    style={({ isActive }) => ({
                      color: isActive ? "black" : "gray",
                      textDecoration: "none",
                    })}
                  >
                    Tests
                  </NavLink>
                </li>
              ) : (
                <li></li>
              )}
              {auth?.user?.role === 0 && (
                <li className="nav-item">
                  <NavLink
                    to="/Workspace"
                    className="nav-link"
                    style={({ isActive }) => ({
                      color: isActive ? "black" : "gray",
                      textDecoration: "none",
                    })}
                  >
                    Workspace
                  </NavLink>
                </li>
              )}

              {auth?.user?.role === 1 && (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/admin/create-assignment"
                      className="nav-link"
                      style={({ isActive }) => ({
                        color: isActive ? "black" : "gray",
                        textDecoration: "none",
                      })}
                    >
                      Create Assignments
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/admin/create-quiz"
                      className="nav-link"
                      style={({ isActive }) => ({
                        color: isActive ? "black" : "gray",
                        textDecoration: "none",
                      })}
                    >
                      Create Quiz
                    </NavLink>
                  </li>
                </>
              )}

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/login"
                      className="nav-link"
                      style={({ isActive }) => ({
                        color: isActive ? "black" : "gray",
                        textDecoration: "none",
                      })}
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/register"
                      className="nav-link"
                      style={({ isActive }) => ({
                        color: isActive ? "black" : "gray",
                        textDecoration: "none",
                      })}
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    style={{ border: "none" }}
                  >
                    {auth?.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        to={`${
                          auth?.user?.role === 1 ? "/admin" : ""
                        }/dashboard/${
                          auth?.user?.role === 1 ? "profile" : "user"
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
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
