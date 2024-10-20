import React from "react";
import "./contact.css";
import { ThemeContext } from "../units/ThemeContext";
import { useContext } from "react";

const Contact = () => {
  const { mode } = useContext(ThemeContext);
  return (
    <div className="contact-container">
      <div className="contact-content">
        <h2>Contact us</h2>
        <p>
          We’d love to hear from you! Whether you have questions, feedback, or
          need assistance, feel free to reach out.
        </p>
        <div className="contacts-info">
          <p>Email: support@todolistapp.com</p>
          <p>Phone: +38 (093) 456-7890</p>
          <p>Address: 123 To-Do Street, Kyiv, Ukraine</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
