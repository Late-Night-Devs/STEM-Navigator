import React, { useState, useEffect, useRef } from "react";
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
  const [isUserID, setUserID] = useState(false);
  const activeLink = "bg-light text-dark rounded p-1";
  const normalLink = "";
  const [isOpen, setIsOpen] = useState(false);
  const dispearMenu = useRef(null);

  // Function to toggle the menu open/close state
  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle clicks outside the menu, closing it if clicked outside
  const handleClickOutside = (event) => {
    // Check if the click event occurred outside the menu container
    if (dispearMenu.current && !dispearMenu.current.contains(event.target)) {
      // Close the menu if it's open
      setIsOpen(false);
    }
  };

  // Add event listener to detect clicks outside the menu and call handleClickOutside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Remove event listener when component unmounts to avoid memory leaks
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Use effect to update isAdmin state based on cookie on component mount or when isAuthenticated changes
  useEffect(() => {
    // Retrieve isAdmin cookie value
    const getCookieAdmin = Cookies.get("isAdmin");
    // Retrieve cookieUID
    const cookieUID = Cookies.get("cookieUId");
    // Set the userID state
    setUserID(cookieUID);
    // Update isAdmin state based on the cookie value
    if (getCookieAdmin === "true") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  // Function to handle changes in isAdmin status
  const handleAdminStatusChange = (newAdminValue) => {
    // Update isAdmin state with the new value
    setIsAdmin(newAdminValue);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid text-dark">
          <div>
            <img
              className="d-inline-block align-top"
              alt="icon-logo"
              src={logo}
              height="40"
            />
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={handleMenuToggle}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse justify-content-between Larger ${isOpen ? "show" : ""
              }`}
            ref={dispearMenu}
            id="navbarNav"
          >
            <ul className={`navbar-nav ${isOpen ? "flex-column" : "flex-row ms-auto"}`}>
              <li className="nav-item custom-list">
                <NavLink
                  exact
                  to="/"
                  className={({ isActive }) =>
                    `linkStyle nav-link ${isActive && activeLink}`
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
                    `linkStyle nav-link ${isActive && activeLink}`
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
                    `linkStyle nav-link ${isActive && activeLink}`
                  }
                  style={{ textDecoration: "none" }}
                >
                  Scholarship
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/calendar"
                  className={({ isActive }) =>
                    `linkStyle nav-link ${isActive && activeLink}`
                  }
                  style={{ textDecoration: "none" }}
                >
                  Calendar
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/program"
                  className={({ isActive }) =>
                    `linkStyle nav-link ${isActive && activeLink}`
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
                    `linkStyle nav-link ${isActive && activeLink}`
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
                    `linkStyle nav-link ${isActive && activeLink}`
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
                      `linkStyle nav-link ${isActive && activeLink}`
                    }
                    style={{ textDecoration: "none" }}
                  >
                    Admin Tools
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          <LogInOutBtn />
        </div>
      </nav>

      <LoginMessage handleAdminStatusChange={handleAdminStatusChange} />
    </>
  );
};

export default NavBar;
