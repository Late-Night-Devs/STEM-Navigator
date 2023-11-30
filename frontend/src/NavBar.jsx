import React from "react";
import logo from "./image/PSU_logo.png"
import "./CSS/NavBar.css";
import LogInOutBtn from "./Auth0/logInOutBtn"
const NavBar = () => {
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
        </ul>
        <LogInOutBtn />
      </div>
    </nav>
  );
};

export default NavBar;


