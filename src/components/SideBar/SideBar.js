import "./SideBar.css";
import avatar from "../../images/avatar.png";

const SideBar = ({ onEditProfile, onLogOut }) => {
  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img className="sidebar__avatar" src={avatar} alt="avatar" />
        <p className="sidebar__name">Name</p>
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
