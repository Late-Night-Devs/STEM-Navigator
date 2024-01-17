import React from "react";
import { Button, Dropdown } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
const LogInOutBtn = () => {
    const { loginWithRedirect, logout, isAuthenticated, isLoading, user } = useAuth0();
    const getUserInitials = (name) => {
        return name.split(' ').map((part) => part[0]).join('');
    };

    return (
        <div className="nav-item">
            {/* User authentication section */}
            {isLoading ? (
                // Display loading indicator when authentication status is being determined
                <nav className="text-white"> ... </nav>
            ) : isAuthenticated ? (
                // If authenticated, show user's profile and logout option
                <Dropdown>
                    <Dropdown.Toggle variant="success" className="bg-white text-dark hover-bg-black hover-text-white" id="dropdown-basic">
                        {user.picture ? (
                            <img
                                src={user.picture}
                                alt="Profile"
                                className="rounded-circle"
                                style={{ width: "25px", height: "25px" }}
                            />
                        ) : (
                            <span
                                className="rounded-circle bg-primary text-white"
                                style={{ width: "25px", height: "25px" }}
                            >
                                {getUserInitials(user.name)}
                            </span>
                        )}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <div className="pl-4">
                            <div style={{ paddingLeft: '20px', fontWeight: 'bold' }}>Hello, {user.given_name}</div>
                        </div>
                        <Dropdown.Divider />
                        <Link to="/profile-testing" className="dropdown-item">Profile</Link>
                        <Link to="/setting" className="dropdown-item">Settings</Link>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={() => logout({ returnTo: window.location.origin })}>
                            Log Out
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            ) : (
                // If not authenticated, show login button
                <Button onClick={loginWithRedirect} variant="dark">
                    Log In
                </Button>
            )}
        </div>
    );
};

export default LogInOutBtn;
