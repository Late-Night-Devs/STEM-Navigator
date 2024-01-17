import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const backend_url = process.env.REACT_APP_BACKEND_URL;

const VerifiedEmail = () => {
  const { user, isAuthenticated } = useAuth0();
  const [showVerificationNotice, setShowVerificationNotice] = useState(false);
  const [initializationFlag, setInitializationFlag] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !initializationFlag) {
      // Check if the user's email is verified
      const isEmailVerified = user?.email_verified;

      if (!isEmailVerified) {
        // If not verified, show the verification notice
        setShowVerificationNotice(true);
      } else {
        // If email is verified, add user to the database
        addUserToDatabase(user);
      }

      // Set initialization flag to true
      setInitializationFlag(true);
    }
  }, [user, isAuthenticated, initializationFlag]);

  const addUserToDatabase = async (user) => {
    try {
      // Add user data to the database
      await axios.post(`${backend_url}/user/addUser`, {
        firstName: user.given_name,
        lastName: user.family_name,
        email: user.email,
      });
      console.log("User added to the database successfully");
    } catch (error) {
      console.error("Error adding user to the database:", error);
    }
  };

  return (
    <div>
      {showVerificationNotice && (
        <div
          style={{
            backgroundColor: "#5C5394",
            color: "white",
            textAlign: "center",
          }}
        >
          <p className="pt-2 mb-0">
            You need to verify your email before continuing. Please check your
            email for verification.
          </p>
          <p className="pb-1 mb-0">
            Reload the site when it's done to remove this notice!
          </p>
        </div>
      )}
    </div>
  );
};

const NoticeMessage = () => {
  return <VerifiedEmail />;
};

export default NoticeMessage;
