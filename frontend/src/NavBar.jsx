import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "./image/PSU_logo.png";
import "./CSS/NavBar.css";
import LogInOutBtn from "./components/Auth0/logInOutBtn";
import { useAuth0 } from "@auth0/auth0-react"; // Import the Auth0 hook
import LoginMessage from "./components/Auth0/LoginMessage.jsx";
import Cookies from "js-cookie"; // Import Cookies

const NavBar = () => {
  const { isAuthenticated } = useAuth0(); // Get user information
  const [isAdmin, setIsAdmin] = useState(false);
  const activeLink = "bg-light text-dark rounded p-1";
  const normalLink = "";

  // Call the function to update isAdmin on component mount and whenever isAuthenticated changes
  useEffect(() => {
    const getCookieAdmin = Cookies.get("isAdmin");
    if (getCookieAdmin === "true") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []); // Empty dependency array ensures the effect runs only once on initial render

  const handleAdminStatusChange = (newAdminValue) => {
    setIsAdmin(newAdminValue);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid text-dark">
          <div>
            <img
              className="d-inline-block align-top"
              alt="icon-logo"
              src={logo}
              height="40"
            />
          </div>

          <ul className="nav">
            <li className="nav-item custom-list">
              <NavLink
                exact
                to="/"
                className={({ isActive }) =>
                  `linkStyle ${isActive ? activeLink : normalLink}`
                }
                style={{ textDecoration: "none" }}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/events"
                className={({ isActive }) =>
                  `linkStyle ${isActive ? activeLink : normalLink}`
                }
                style={{ textDecoration: "none" }}
              >
                Events
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/scholarship"
                className={({ isActive }) =>
                  `linkStyle ${isActive ? activeLink : normalLink}`
                }
                style={{ textDecoration: "none" }}
              >
                Scholarship
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/calender"
                className={({ isActive }) =>
                  `linkStyle ${isActive ? activeLink : normalLink}`
                }
                style={{ textDecoration: "none" }}
              >
                Calender
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/program"
                className={({ isActive }) =>
                  `linkStyle ${isActive ? activeLink : normalLink}`
                }
                style={{ textDecoration: "none" }}
              >
                Program
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/newsletter"
                className={({ isActive }) =>
                  `linkStyle ${isActive ? activeLink : normalLink}`
                }
                style={{ textDecoration: "none" }}
              >
                Newsletter
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/contact"
                className={({ isActive }) =>
                  `linkStyle ${isActive ? activeLink : normalLink}`
                }
                style={{ textDecoration: "none" }}
              >
                Contact
              </NavLink>
            </li>
            {isAdmin && isAuthenticated && (
              <li className="nav-item">
                <NavLink
                  exact
                  to="/admin-modify-db"
                  className={({ isActive }) =>
                    `linkStyle ${isActive ? activeLink : normalLink}`
                  }
                  style={{ textDecoration: "none" }}
                >
                  Admin Tools {isAdmin} {isAuthenticated}
                </NavLink>
              </li>
            )}
          </ul>

          <LogInOutBtn />
        </div>
      </nav>
      <LoginMessage handleAdminStatusChange={handleAdminStatusChange} />
    </>
  );
};

export default NavBar;
