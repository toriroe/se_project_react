import "./SideBar.css";
import avatar from "../../images/avatar.png";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div>
        <img className="sidebar__avatar" src={avatar} alt="avatar" />
      </div>
      <div className="sidebar__name">Name</div>
    </div>
  );
};

export default SideBar;
