import React from "react";
import { NavLink } from "react-router-dom";
import logo from "./image/PSU_logo.png";
import "./CSS/NavBar.css";
import LogInOutBtn from "./components/Auth0/logInOutBtn";
import { useAuth0 } from "@auth0/auth0-react"; // Import the Auth0 hook
import LoginMessage from "./components/Auth0/LoginMessage.jsx";
const NavBar = () => {
  const { user, isAuthenticated } = useAuth0(); // Get user information
  const activeLink = "bg-light text-dark rounded p-1";
  const normalLink = "";

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
              {/* <a className="nav-link" href="/">
              Home
            </a> */}
              <NavLink
                exact
                to="/"
                className={({ isActive }) =>
                  `linkStyle ${isActive ? activeLink : normalLink}`
                }
                style={{ textDecoration: "none" }}
              >
                Home
                {/* <li className="testing-css">Home</li> */}
              </NavLink>
            </li>
            <li className="nav-item">
              {/* <a className="nav-link" href="/events">
              Events
            </a> */}
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
              {/* <a className="nav-link" href="/scholarship">
              Scholarship
            </a> */}
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
              {/* <a className="nav-link" href="/calender">
              Calender
            </a> */}
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
              {/* <a className="nav-link" href="/program">
              Program
            </a> */}
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
              {/* <a className="nav-link" href="/newsletter">
              Newsletter
            </a> */}
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
              {/* <a className="nav-link" href="/newsletter">
              Newsletter
            </a> */}
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

            {/* Conditionally render the Admin Tools link */}
            {isAuthenticated &&
              user &&
              user.email === "latenightdevsfw23@gmail.com" && (
                <li className="nav-item">
                  {/* <a className="nav-link" href="/admin-modify-db">
                  Admin Tools
                </a> */}
                  <NavLink
                    exact
                    to="/admin-modify-db"
                    className={({ isActive }) =>
                      `linkStyle ${isActive ? activeLink : normalLink}`
                    }
                    style={{ textDecoration: "none" }}
                  >
                    Admin Tools
                  </NavLink>
                </li>
              )}
          </ul>

          <LogInOutBtn />
        </div>
      </nav>
      <LoginMessage />
    </>
  );
};

export default NavBar;
