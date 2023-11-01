import "./Header.css";
import logo from "../../images/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

const Header = ({ onCreateModal, location, loggedIn, onLogIn, onSignUp }) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);

  const avatarExists = currentUser.avatar !== "" ? true : false;

  return (
    <header className="header">
      <div className="header__logo-and-date">
        <Link to="/">
          <img className="header__logo" src={logo} alt="wtwr logo" />
        </Link>
        <div className="header__date">
          {currentDate}, {location}
        </div>
      </div>
      <div className="header__button-and-avatar">
        <ToggleSwitch />
        {loggedIn ? (
          <div className="header__button-and-avatar">
            <div>
              <button
                className="header__button"
                type="text"
                onClick={onCreateModal}
              >
                + Add clothes
              </button>
            </div>

            <Link className="header__name" to="/profile">
              {currentUser.name}
            </Link>
            <Link to="/profile">
              {avatarExists ? (
                <img
                  className="header__avatar"
                  src={currentUser.avatar}
                  alt="avatar"
                />
              ) : (
                <p className="header__avatar-letter">
                  {currentUser.name[0].toUpperCase()}
                </p>
              )}
            </Link>
          </div>
        ) : (
          <div className="header__registration">
            <button className="header__button-register" onClick={onSignUp}>
              Sign Up
            </button>
            <button className="header__button-login" onClick={onLogIn}>
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
