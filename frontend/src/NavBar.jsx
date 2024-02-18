import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import logo from "./image/PSU_logo2.svg";
import "./CSS/NavBar.css";
import LogInOutBtn from "./components/Auth0/logInOutBtn";
import { useAuth0 } from "@auth0/auth0-react"; // Import the Auth0 hook
import LoginMessage from "./components/Auth0/LoginMessage.jsx";
import Cookies from "js-cookie"; // Import Cookies

const NavBar = () => {
  // Get user authentication information from Auth0
  const { isAuthenticated } = useAuth0();
  // State variables for managing admin status, user ID, and menu toggling
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUserID, setUserID] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State for controlling mobile menu

  // Ref for referencing the menu container
  const dispearMenu = useRef(null);

  // CSS class for highlighting active links in the navbar
  const activeLink = "bg-light text-dark rounded p-2";

  // Function to toggle the menu open/close state
  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  console.log("is open:  ", isOpen);
  // Function to handle clicks outside the menu, closing it if clicked outside
  const handleClickOutside = (event) => {
    // Check if the click event occurred outside the menu container
    if (
      dispearMenu.current &&
      !dispearMenu.current.contains(event.target) &&
      !event.target.closest(".navbar-toggler") // Check if the collapse button is clicked
    ) {
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
          <div className="pl-5">
            <img
              className="d-inline-block align-top logo-image"
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
            className={`collapse navbar-collapse justify-content-between Larger ${
              isOpen ? "show" : ""
            }`}
            ref={dispearMenu}
            id="navbarNav"
          >
            <ul
              className={`navbar-nav ${
                isOpen ? "flex-column" : "flex-row ms-auto"
              }`}
            >
              <li className="nav-item">
                <NavLink
                  exact
                  to="/"
                  className={({ isActive }) =>
                    `nav-link ${isActive && activeLink} `
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/events"
                  className={({ isActive }) =>
                    `nav-link ${isActive && activeLink} `
                  }
                >
                  Events
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/scholarship"
                  className={({ isActive }) =>
                    `nav-link ${isActive && activeLink} `
                  }
                >
                  Scholarship
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/calendar"
                  className={({ isActive }) =>
                    `nav-link ${isActive && activeLink} `
                  }
                >
                  Calendar
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/program"
                  className={({ isActive }) =>
                    `nav-link ${isActive && activeLink} `
                  }
                >
                  Program
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink
                  exact
                  to="/contact"
                  className={({ isActive }) =>
                    `nav-link ${isActive && activeLink} `
                  }
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
                      `nav-link ${isActive && activeLink} text-nowrap`
                    }
                  >
                    Admin Tools
                  </NavLink>
                </li>
              )}
              <LogInOutBtn />
            </ul>
          </div>
        </div>
      </nav>

      <LoginMessage handleAdminStatusChange={handleAdminStatusChange} />
    </>
  );
};

export default NavBar;
