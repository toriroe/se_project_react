import "./ItemCard.css";

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
      <div className="card__name">{card.name}</div>{" "}
    </div>
  );
};

export default ItemCard;
