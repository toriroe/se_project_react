import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

const SideBar = ({ handleEditProfileModal, onLogOut }) => {
  const currentUser = useContext(CurrentUserContext);
  const avatarExists = currentUser.avatar !== "" ? true : false;

  return (
    <div className="sidebar">
      <div className="sidebar__user">
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
        <p className="sidebar__name">{currentUser.name}</p>
      </div>
      <div className="sidebar__buttons">
        <button className="sidebar__button" onClick={handleEditProfileModal}>
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
