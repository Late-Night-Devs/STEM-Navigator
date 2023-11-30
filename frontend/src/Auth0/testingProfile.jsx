// this is for testing auth0 
// fetching data user from auth0 for the frontend
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();
    console.log("profile page");
    if (!isAuthenticated) {
        return <div>Please login to view profile information.</div>;
    }

    return (
        <div className="profile">
            <h2>User Profile</h2>
            {user && (
                <div>
                    <img src={user.picture} alt="Profile" />
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    {/* Display other user information here */}
                    <pre>{JSON.stringify(user, null, 2)}</pre> {/* This will display all user information in a formatted JSON view */}
                </div>
            )}
        </div>
    );
};

export default Profile;
