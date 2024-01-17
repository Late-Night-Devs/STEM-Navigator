import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

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
        className={`fade ${
          showVerificationNotice ? "show" : "hide"
        }`}
        // role="alert"
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

const NoticeMessage = () => {
  return <LoginCheckMessage />;
};

export default NoticeMessage;
