import React from "react";
import logo from "./image/PSU_logo.png";
import "./CSS/NavBar.css";
import LogInOutBtn from "./components/Auth0/logInOutBtn";
import { useAuth0 } from "@auth0/auth0-react"; // Import the Auth0 hook

const NavBar = () => {
  const { user, isAuthenticated } = useAuth0(); // Get user information

  return (
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

        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/events">
              Events
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/scholarship">
              Scholarship
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/calendar">
              Calendar
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/program">
              Program
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/newsletter">
              Newsletter
            </a>
          </li>

          {/* Conditionally render the Admin Tools link */}
          {isAuthenticated &&
            user &&
            user.email === "latenightdevsfw23@gmail.com" && (
              <li className="nav-item">
                <a className="nav-link" href="/admin-modify-db">
                  Admin Tools
                </a>
              </li>
            )}
        </ul>

        <LogInOutBtn />
      </div>
    </nav>
  );
};

export default NavBar;
