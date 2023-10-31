import "./LoginModal.css";
import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ onClose, handleLogIn }) => {
  const [email, setEmail] = useState("");
  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogIn({ email, password });
  };

  return (
    <ModalWithForm
      title="Log In"
      onClose={onClose}
      buttonText="Log In"
      onSubmit={handleSubmit}
    >
      <div className="modal__form-content">
        <label>
          <p className="modal__input-title">Email</p>
          <input
            className="modal__form-input"
            type="email"
            name="email"
            placeholder="Email"
            minLength="1"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <label>
          <p className="modal__input-title">Password</p>
          <input
            className="modal__form-input"
            type="password"
            name="password"
            placeholder="Password"
            minLength="1"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
