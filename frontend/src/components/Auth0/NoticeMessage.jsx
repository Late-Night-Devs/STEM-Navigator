import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Modal from "react-modal";
import VerifiedEmail from "../../image/verifyEmail.png"
// Set the app element (main content element) for the modal
Modal.setAppElement("#root");

const LoginCheckMessage = () => {
  const { isAuthenticated } = useAuth0();
  const [showVerificationNotice, setShowVerificationNotice] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      // Delay the appearance of the message by 2s
      const delay = 1000;

      const timeoutId = setTimeout(() => {
        setShowVerificationNotice(true);
      }, delay);

      // Clear the timeout if the component unmounts
      return () => clearTimeout(timeoutId);
    } else {
      setShowVerificationNotice(false);
    }
  }, [isAuthenticated]);

  return (
    <div>
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
      // if email is verified. modal wont open.
      setModalIsOpen(false);
    }
  };

  useEffect(() => {
    checkEmailVerification();

    // Clear the intervals on unmount or when the user confirms
    return () => {
      clearInterval(interval);
    };
  }, [isAuthenticated, user, countdown]); // Include countdown in the dependency array

  const handleConfirm = () => {
    clearInterval(interval);
    window.location.reload();
  };

  const handleLogout = () => {
    setModalIsOpen(false);
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
                experience all the features this website has to offer. Hit "Confirm" when you're done!
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


const NoticeMessage = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <>{!isAuthenticated ? <LoginCheckMessage /> : <VerifiedEmailLogin />}</>
  );
};

export default NoticeMessage;
