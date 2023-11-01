import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

const ClothesSection = ({
  handleCreateModal,
  handleSelectedCard,
  clothingItems,
  onCardLike,
  isLoggedIn,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const filteredItems = clothingItems.filter((item) => {
    return item.owner === currentUser._id;
  });

  return (
    <div className="clothes__section">
      <div className="clothes__section-wrapper">
        <p className="clothes__section-title">Your items</p>
        <button className="clothes__section-button" onClick={handleCreateModal}>
          + Add new
        </button>
      </div>
      <div className="clothes__items">
        {filteredItems.map((item) => {
          return (
            <ItemCard
              card={item}
              onSelectCard={handleSelectedCard}
              key={item._id}
              onCardLike={onCardLike}
              isLoggedIn={isLoggedIn}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ClothesSection;
