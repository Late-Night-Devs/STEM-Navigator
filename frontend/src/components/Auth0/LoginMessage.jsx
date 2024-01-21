import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Modal from "react-modal";
import VerifiedEmail from "../../image/verifyEmail.png";
import Cookies from "js-cookie";
// Set the app element (main content element) for the modal
Modal.setAppElement("#root");

const backend_url = process.env.REACT_APP_BACKEND_URL;

const LoginCheckMessage = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [showVerificationNotice, setShowVerificationNotice] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setShowVerificationNotice(!isAuthenticated);
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    // You can return a loading indicator or null while the authentication status is being determined
    return null;
  }
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        left: 0,
        right: 0,
        height: showVerificationNotice ? "auto" : 0,
        overflow: "hidden",
        transition: "height 2.5s ease, opacity 3s ease",
        opacity: showVerificationNotice ? 1 : 0,
      }}
    >
      <div
        className={`fade ${showVerificationNotice ? "show" : "hide"}`}
        style={{
          backgroundColor: "#5C5394",
          color: "white",
          textAlign: "center",
        }}
      >
        <p className="p-2 mb-0">
          Please login with an email account to save your progress.
        </p>
      </div>
    </div>
  );
};

const VerifiedEmailLogin = () => {
  const { isAuthenticated, user, logout, isLoading } = useAuth0();
  const [countdown, setCountdown] = useState(30);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  let interval;
  const userIdFromCookie = Cookies.get("cookieUId");
  // useRef to store the state of whether the user is added
  const addUserTracking = useRef(false);

  const checkEmailVerification = async () => {
    if (isAuthenticated && user && !user.email_verified) {
      setModalIsOpen(true);

      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      // Countdown for automatic logout
      if (countdown === 1) {
        logout({ returnTo: window.location.origin });
      }
    } else if (user.email_verified) {
      // if email is verified. modal won't open. add user to the database
      // store userID to a cookie
      setModalIsOpen(false); // close the notice
      console.log(
        "1/ email verified --- Initial userID from cookie:",
        userIdFromCookie
      );

      if (!userIdFromCookie) {
        const emailExists = await checkEmailExists(user.email);
        console.log("3/ checking the email exists or not:  ", emailExists);
        if (emailExists) {
           addUserTracking.current = true;
          console.log("add userID to cookie: ", emailExists);
        } else {
          console.log("addUserTracking:  ", addUserTracking);
          if (addUserTracking.current === false) {
            // add a new user to database;
            // store the return userID to cookie
            const getUserID = await AddUserToDatabase(user);
            console.log(
              "User added to the database successfully with ID:",
              getUserID
            );
            if (getUserID) {
              addUserTracking.current = true; // Set the ref to true to prevent future calls
              // Store the userId in a cookie
              Cookies.set("cookieUId", getUserID);
            }
          }
        }
      }
    }
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(
        `${backend_url}/user/checkEmailExists?email=${email}`,
        {
          withCredentials: true,
        }
      );
      const foundEmail_userID = response.data.userID;
      // Check if response.data.userID exists
      console.log("Response from checking email: ", response.data);
           console.log(
             "Response from checking email - userID: ",
             response.data.userID
           );
      if (foundEmail_userID) {
        console.log(
          "checkEmailExists - ADDED userID to Cookies:  ",
          foundEmail_userID
        );
        Cookies.set("cookieUId", foundEmail_userID);
        return foundEmail_userID;
      }
    } catch (error) {
      console.error("Error checking email existence:", error);
      return false;
    }
  };

  const AddUserToDatabase = async (user) => {
    try {
      if (!user.given_name) user.given_name = "nonFirstName";
      if (!user.family_name) user.family_name = "nonLastName";
      // Add user data to the database
      const response = await axios.post(
        `${backend_url}/user/addUser`,
        {
          firstName: user.given_name,
          lastName: user.family_name,
          email: user.email,
          admin: "FALSE",
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.user.id;
    } catch (error) {
      console.error("Error adding user to the database:", error);
      console.log("Error from BE:", error);
      throw error;
    }
  };

  useEffect(() => {
    checkEmailVerification();
    // Clear the intervals on unmount or when the user confirms
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, []);

  const handleConfirm = () => {
    clearInterval(interval);
    window.location.reload();
  };

  const handleLogout = async () => {
    await setModalIsOpen(false);
    logout({ returnTo: window.location.origin });
  };

  if (
    isLoading ||
    !isAuthenticated ||
    (user && user.email_verified) ||
    !modalIsOpen
  ) {
    // Return null or loading indicator while the authentication status is being determined
    return null;
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {}}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        contentLabel="Verification Alert"
        style={{
          content: {
            width: "80%",
            margin: "20px auto",
            padding: "2px",
            border: "1px solid #5C5394",
            boxShadow: "5px 4px 8px rgba(0, 0, 0.1, 0.1)",
          },
        }}
      >
        <div className="modal-content mx-0 ">
          <div className="modal-body text-center mb-0">
            <div className="">
              <p
                className="p-4 mb-0 rounded"
                style={{
                  backgroundColor: "#5C5394",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Please verify your email with Auth0 and refresh the page to
                experience all the features this website has to offer. Hit
                "Confirm" when you're done!
              </p>
              <img
                src={VerifiedEmail}
                alt="Verification"
                className="img-fluid mb-3 border mt-1 p-2 "
                style={{ maxWidth: "80%", maxHeight: "80%" }}
              />
            </div>
          </div>
          <div className="modal-footer pt-2 gap-1 mx-auto mb-0">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleConfirm}
            >
              Confirm
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleLogout}
            >
              Logout in {countdown}s
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const LoginMessage = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return null;
  }

  return !isAuthenticated ? <LoginCheckMessage /> : <VerifiedEmailLogin />;
};

export default LoginMessage;
