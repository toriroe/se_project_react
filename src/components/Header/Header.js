import "./Header.css";

const Header = ({ onCreateModal }) => {
  return (
    <header className="header">
      <div className="header__logo-and-date">
        <div>
          <img
            className="header__logo"
            src={require("../../images/logo.svg").default}
            alt="wtwr logo"
          />
        </div>
        <div className="header__date">Date</div>
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
          <img
            className="header__avatar"
            src={require("../../images/avatar.png")}
            alt="wtwr logo"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
