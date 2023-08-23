import "./Header.css";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.png";

const Header = ({ onCreateModal, location }) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__logo-and-date">
        <div>
          <img className="header__logo" src={logo} alt="wtwr logo" />
        </div>
        <div className="header__date">
          {currentDate}, {location}
        </div>
      </div>
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
        <div className="header__name">Name</div>
        <div>
          <img className="header__avatar" src={avatar} alt="wtwr logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;
