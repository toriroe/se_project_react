import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

const Profile = ({
  handleCreateModal,
  handleSelectedCard,
  clothingItems,
  onEditProfile,
  onLogOut,
}) => {
  return (
    <div className="profile">
      <SideBar onLogOut={onLogOut} />
      <ClothesSection
        handleCreateModal={handleCreateModal}
        handleSelectedCard={handleSelectedCard}
        clothingItems={clothingItems}
      />
    </div>
  );
};

export default Profile;
