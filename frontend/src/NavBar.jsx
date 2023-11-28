import React from "react";
//import logo from "./img/PSU_logo.png";
import logo from "./image/PSU_logo.png"
import "./CSS/NavBar.css";
import { useAuth0 } from '@auth0/auth0-react';

const NavBar = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  const getUserInitials = (name) => {
    return name.split(' ').map(part => part[0]).join('');
  };
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
          <li className="nav-itemk ">
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
            <a className="nav-link" href="/calender">
              Calender
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
          <li className="nav-item">
            <a className="nav-link" href="/admin-modify-db">
              Admin Tools
            </a>
          </li>
          <li className="nav-item">
            {isAuthenticated ? (
              <div className="d-flex align-items-center">
                <div className="me-2">
                  {user.picture ? (
                    <img src={user.picture} alt="Profile" className="rounded-circle" style={{ width: '30px', height: '30px' }} />
                  ) : (
                    <span className="rounded-circle bg-primary text-white d-inline-flex justify-content-center align-items-center" style={{ width: '30px', height: '30px' }}>
                      {getUserInitials(user.name)}
                    </span>
                  )}
                </div>
                <span>Welcome, {user.given_name || user.name}</span>
                <button className="btn btn-outline-secondary ms-2" onClick={() => logout({ returnTo: window.location.origin })}>
                  Log Out
                </button>
              </div>
            ) : (
              <button className="btn btn-outline-light" onClick={() => loginWithRedirect()}>
                Log In
              </button>
            )}
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default NavBar;