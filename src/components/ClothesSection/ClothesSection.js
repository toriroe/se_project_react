import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

const ClothesSection = ({
  handleCreateModal,
  handleSelectedCard,
  clothingItems,
}) => {
  return (
    <div className="clothes__section">
      <div className="clothes__section-wrapper">
        <p className="clothes__section-title">Your items</p>
        <button className="clothes__section-button" onClick={handleCreateModal}>
          + Add new
        </button>
      </div>
      <div className="clothes__items">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              card={item}
              onSelectCard={handleSelectedCard}
              key={item.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ClothesSection;