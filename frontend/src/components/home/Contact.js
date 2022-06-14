import React, { useState } from "react";
import { Directions, LinkedIn, Mail, Phone, Send } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import "./Contact.css";
import { Fade, Zoom } from "react-reveal";
import axios from "axios";
import CustomAlert from "../layout/CustomAlert";
const Contact = () => {
  const contacts = [
    {
      id: 1,
      icon: <Mail className="contactIcon" />,
      text: "info@steeldalal.com",
    },
    {
      id: 2,
      icon: <Phone className="contactIcon" />,
      text: "+91-7412-900-222",
    },
    {
      id: 3,
      icon: <Directions className="contactIcon" />,
      text: `Skybox Business Center,Noida
        Uttar Pradesh, India`,
    },
    {
      id: 4,
      icon: <LinkedIn className="contactIcon" />,
      text: `steel-dalal`,
    },
  ];

  const contactFormDetails = [
    {
      id: 5,
      label: "Name *",
      name: "name",
      placeholder: "Enter your name",
    },
    {
      id: 6,
      label: "Email *",
      name: "email",
      placeholder: "Enter your email",
    },
    {
      id: 7,
      label: "Subject *",
      name: "subject",
      placeholder: "Enter subject here",
    },
    {
      id: 8,
      label: "Message *",
      name: "message",
      placeholder: "Enter message here",
    },
  ];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const handleChange = (e) =>
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, subject, message } = values;
    if (name !== "" || email !== "" || subject !== "" || message !== "") {
      try {
        setError(null);
        setSent(false);
        setLoading(true);
        const { data } = await axios.post("/contact", values, {
          "Content-Type": "application/json",
        });
        setSent(data.msg);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setSent(false);
        setError(err.response.data.msg);
      }
    } else {
      setError("All fields are required");
    }
  };
  return (
    <div className="contactMainContainer" id="contact">
      <Typography align="center" variant="h4" component="h4">
        Contact Us
      </Typography>
      <div className="contactContentContainer">
        <div className="contactContentContainerLeft">
          {loading && (
            <CustomAlert
              type="success"
              text="Sending..."
              handleClose={() => setLoading(false)}
            />
          )}
          {sent && (
            <CustomAlert
              type="success"
              text="Message sent"
              handleClose={() => setSent(false)}
            />
          )}
          {error && (
            <CustomAlert
              type="error"
              text={error}
              handleClose={() => setError(null)}
            />
          )}
          <form className="contactForm" onSubmit={handleSubmit}>
            {contactFormDetails.map((detail) => (
              <div className="contactFormInput" key={detail.id}>
                <label htmlFor={detail.name}>{detail.label}</label>
                {detail.name !== "message" ? (
                  <input
                    type="text"
                    name={detail.name}
                    placeholder={detail.placeholder}
                    required
                    onChange={handleChange}
                  />
                ) : (
                  <textarea
                    name={detail.name}
                    placeholder={detail.placeholder}
                    required
                    onChange={handleChange}
                  ></textarea>
                )}
              </div>
            ))}
            <Zoom>
              <Button
                endIcon={<Send />}
                disabled={loading}
                type="submit"
                color="primary"
                variant="contained"
              >
                Send
              </Button>
            </Zoom>
          </form>
        </div>
        <div className="contactContentContainerRight">
          {contacts.map((contact) => (
            <div key={contact.id} className="contactItem">
              <Fade>
                <div className="contactIconContainer">{contact.icon}</div>
              </Fade>
              <p>{contact.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
