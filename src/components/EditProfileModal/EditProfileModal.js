import "./EditProfileModal.css";
import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

const EditProfileModal = ({ onClose, handleEditProfile }) => {
  const currentUser = useContext(CurrentUserContext);
  const _id = currentUser._id;
  const token = localStorage.getItem("jwt");

  const [name, setName] = useState(currentUser.name);
  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const [avatar, setAvatar] = useState(currentUser.avatar);
  const handleAvatarChange = (evt) => {
    setAvatar(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleEditProfile({ name, avatar, _id, token });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      onClose={onClose}
      buttonText="Save Changes"
      onSubmit={handleSubmit}
    >
      <div className="modal__form-content">
        <label>
          <p className="modal__input-title">Name*</p>
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
          <p className="modal__input-title">Avatar*</p>
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

export default EditProfileModal;
