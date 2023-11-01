import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import likeButtonImage from "../../images/like-button.svg";
import likedButton from "../../images/like-button-clicked.svg";

const ItemCard = ({ card, onSelectCard, onCardLike, isLoggedIn }) => {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = card.likes.some((id) => id === currentUser._id);
  const cardLikeButtonSrc = `${isLiked ? likedButton : likeButtonImage}`;
  const cardLikeButtonClass = `card__like-button ${
    isLoggedIn ? "card__like-button_visible" : "card__like-button_hidden"
  }`;

  const handleCardClick = () => {
    onSelectCard(card);
  };

  const handleCardLike = () => {
    onCardLike(card._id, isLiked, currentUser._id);
  };

  return (
    <div className="card">
      <img
        className="card__image"
        src={card.imageUrl}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="card__title">
        <div className="card__name">{card.name}</div>{" "}
        <img
          src={cardLikeButtonSrc}
          className={cardLikeButtonClass}
          onClick={handleCardLike}
        />
      </div>
    </div>
  );
};

export default ItemCard;
