import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

const Profile = ({ handleCreateModal, handleSelectedCard, clothingItems }) => {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        handleCreateModal={handleCreateModal}
        handleSelectedCard={handleSelectedCard}
        clothingItems={clothingItems}
      />
    </div>
  );
};

export default Profile;
