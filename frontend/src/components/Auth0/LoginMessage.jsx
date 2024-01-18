import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Modal from "react-modal";
import VerifiedEmail from "../../image/verifyEmail.png"
import Cookies from "js-cookie";
// Set the app element (main content element) for the modal
Modal.setAppElement("#root");

const backend_url = process.env.REACT_APP_BACKEND_URL;

const LoginCheckMessage = () => {
  const { isAuthenticated } = useAuth0();
  const [showVerificationNotice, setShowVerificationNotice] = useState(false);

  console.log("login check message running ...");
  useEffect(() => {
    if (isAuthenticated) {
      setShowVerificationNotice(false);
    } else 
       setShowVerificationNotice(true);
  }, [isAuthenticated]);

  return (
    <div
      style={{
        height: showVerificationNotice ? "auto" : 0,
        overflow: "hidden",
        transition: "height 2.5s ease, opacity 2.5s ease",
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
  const { isAuthenticated, user, logout } = useAuth0();
  const [countdown, setCountdown] = useState(30);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  let interval;
  const userIdFromCookie = Cookies.get("cookieUId");

  // useRef to store the state of whether the user is added
  const isUserAddedRef = useRef(false);

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
    } else {
      setModalIsOpen(false);

      // if email is verified. modal won't open. add user to the database
      // store userID to a cookie
      if (Cookies.get("addUserState") === "undefined") {
        Cookies.set("addUserState", "FALSE");
      }
      const isUserAdded = Cookies.get("addUserState");
      console.log(
        "email verified --- go next to add the user and store cookies!  :",
        userIdFromCookie,
        isUserAdded
      );

      // Check if the user is not added and not in the process of being added
      if (isUserAdded !== "undefined" && !isUserAddedRef.current) {
        Cookies.set("addUserState", "TRUE");
        isUserAddedRef.current = true; // Set the ref to true to prevent future calls
        // Check if the email already exists before making the POST request
        const emailExists = await checkEmailExists(user.email);
        console.log("checking email exists: ", emailExists);
        if (!emailExists) {
          await AddUserToDatabase();
        }
      }
    }
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(
        `${backend_url}/user/checkEmailExists?email=${email}`
      );
      return response.data.exists;
    } catch (error) {
      console.error("Error checking email existence:", error);
      return false; 
    }
  };

  const AddUserToDatabase = async () => {
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
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const userId = response.data.insertId;

      console.log("User added to the database successfully with ID:", userId);
      // Store the userId in a cookie
      Cookies.set("cookieUId", userId);

      return userId; // Return the user ID
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
  const { isAuthenticated } = useAuth0();
  return (
    <>{!isAuthenticated ? <LoginCheckMessage /> : <VerifiedEmailLogin />}</>
  );
};

export default LoginMessage;
