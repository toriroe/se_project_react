import "./SideBar.css";
import avatar from "../../images/avatar.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

const SideBar = ({ onEditProfile, onLogOut }) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user">
        {currentUser.avatar ? (
          <img
            className="header__avatar"
            src={currentUser.avatar}
            alt="avatar"
          />
        ) : (
          <p className="header__avatar-letter">
            {currentUser.name.charAt(0).toUpperCase()}
          </p>
        )}
        <p className="sidebar__name">{currentUser.name}</p>
      </div>
      <div className="sidebar__buttons">
        <button className="sidebar__button" onClick={onEditProfile}>
          Change profile data
        </button>
        <button className="sidebar__button" onClick={onLogOut}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default SideBar;
