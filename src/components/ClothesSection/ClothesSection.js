import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

const ClothesSection = ({ handleCreateModal, handleSelectedCard }) => {
  return (
    <div className="clothes__section">
      <div className="clothes__section-wrapper">
        <p className="clothes__section-title">Your items</p>
        <button className="clothes__section-button" onClick={handleCreateModal}>
          + Add new
        </button>
      </div>
      <div className="clothes__items">
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard
              card={item}
              onSelectCard={handleSelectedCard}
              key={item._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ClothesSection;
