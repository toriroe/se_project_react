import "./ItemCard.css";
import likeButtonImage from "../../images/like-button.svg";

const ItemCard = ({ card, onSelectCard }) => {
  const handleCardClick = () => {
    onSelectCard(card);
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
        <img src={likeButtonImage} className="card__like-button" />
      </div>
    </div>
  );
};

export default ItemCard;
