import "./AddItemModal.css";
import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ handleAddItem, onClose, isLoading }) => {
  const token = localStorage.getItem("jwt");

  const [name, setName] = useState("");
  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const [imageUrl, setUrl] = useState("");
  const handleUrlChange = (evt) => {
    setUrl(evt.target.value);
  };

  const [weather, setWeatherType] = useState("");
  const handleWeatherChange = (evt) => {
    setWeatherType(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleAddItem({ name, imageUrl, weather, token });
  };

  return (
    <ModalWithForm
      title="New Garment"
      onClose={onClose}
      buttonText={isLoading ? "Saving..." : "Add Garment"}
      onSubmit={handleSubmit}
    >
      <div className="modal__form-content">
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
          <p className="modal__input-title">Image</p>
          <input
            className="modal__form-input"
            type="url"
            name="imageUrl"
            minLength="1"
            placeholder="Image URL"
            value={imageUrl}
            onChange={handleUrlChange}
          />
        </label>
        <p className="modal__radio-title">Select the weather type:</p>
        <div className="modal__radio-options">
          <div className="modal__radio-option">
            <input
              className="modal__radio-button"
              type="radio"
              id="hot"
              value="hot"
              name="weather"
              onChange={handleWeatherChange}
            />
            <label htmlFor="hot"> Hot </label>
          </div>
          <div className="modal__radio-option">
            <input
              className="modal__radio-button"
              type="radio"
              id="warm"
              value="warm"
              name="weather"
              onChange={handleWeatherChange}
            />
            <label htmlFor="warm"> Warm </label>
          </div>
          <div className="modal__radio-option">
            <input
              className="modal__radio-button"
              type="radio"
              id="cold"
              value="cold"
              name="weather"
              onChange={handleWeatherChange}
            />
            <label htmlFor="cold"> Cold </label>
          </div>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
