import "./ItemCard.css";

const ItemCard = ({ card, onSelectCard }) => {
  return (
    <div>
      {" "}
      <div>
        <img
          className="card__image"
          src={card.link}
          onClick={() => onSelectCard(card)}
        />
      </div>
      <div className="card__name">{card.name}</div>{" "}
    </div>
  );
};

export default ItemCard;
