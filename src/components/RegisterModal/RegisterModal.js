import "./RegisterModal.css";
import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ onClose, handleSignUp, isLoading }) => {
  const [email, setEmail] = useState("");
  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  const [name, setName] = useState("");
  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const [avatar, setAvatar] = useState("");
  const handleAvatarChange = (evt) => {
    setAvatar(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleSignUp({ name, avatar, email, password });
  };

  return (
    <ModalWithForm
      title="Sign Up"
      onClose={onClose}
      buttonText={isLoading ? "Saving..." : "Next"}
      onSubmit={handleSubmit}
    >
      <div className="modal__form-content">
        <label>
          <p className="modal__input-title">Email*</p>
          <input
            className="modal__form-input"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <label>
          <p className="modal__input-title">Password*</p>
          <input
            className="modal__form-input"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <label>
          <p className="modal__input-title">Name</p>
          <input
            className="modal__form-input"
            type="text"
            name="name"
            minLength="1"
            maxLength="30"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />
        </label>
        <label>
          <p className="modal__input-title">Avatar URL</p>
          <input
            className="modal__form-input"
            type="url"
            name="avatar"
            placeholder="Avatar URL"
            value={avatar}
            onChange={handleAvatarChange}
          />
        </label>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
