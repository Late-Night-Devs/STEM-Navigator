import { useState } from "react";
import { send } from "emailjs-com";
import "../CSS/Contact.css";

function Contact() {
  const [nameProgram, setnameProgram] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = () => {
    setnameProgram("");
    setName("");
    setEmail("");
    setMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    send(
      "service_67a3xrb",
      "template_k0mdvbm",
      { nameProgram, name, email, message },
      "7dbsaf1mTAXe_Jhtj"
    )
      .then((response) => {
        console.log(
          "Message sent successfully",
          response.status,
          response.text
        );
        alert("Your submission was sent successfully!");
      })
      .catch((error) => {
        console.log("Failed", error);
      });

    if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
      alert("Please fill in the form before sending message!");
      return;
    }

    const emailValid = /^\w+[+.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i;
    const checkEmail = emailValid.test(email);
    if (!checkEmail) {
      alert("Please enter a valid email");
      return;
    }
    handleReset();
  };

  return (
    <div className="content bg-light rounded mx-auto p-3 mt-5">
      <form className="mx-auto shadow rounded p-2 mb-2">
        <h1 className="mb-4  text-center fw-bold">
          Submission for new program
        </h1>
        <div className="mb-3">
          <label className="form-label fw-bold" for="nameProgram">
            Program Name
          </label>
          <input
            className="form-control shadow-sm"
            id="nameProgram"
            type="text"
            placeholder="Enter program name"
            value={nameProgram}
            onChange={(addnameProgram) =>
              setnameProgram(addnameProgram.target.value)
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold" for="name">
            Lead Contact
          </label>
          <input
            className="form-control shadow-sm"
            id="name"
            type="text"
            placeholder="Enter lead contact"
            value={name}
            onChange={(addName) => setName(addName.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold" for="email">
            Email
          </label>
          <div className="input-group">
            <input
              className="form-control shadow-sm"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(addEmail) => setEmail(addEmail.target.value)}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold" for="message">
            Program Details
          </label>
          <textarea
            className="form-control shadow-sm"
            id="message"
            rows={6}
            placeholder="Enter your program details"
            value={message}
            onChange={(addMessage) => setMessage(addMessage.target.value)}
          />
        </div>
        <div className="d-flex">
          <button
            className="btn submit w-100 btn-primary btn-block fw-bold "
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Contact;
