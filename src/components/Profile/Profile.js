import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

const Profile = ({
  handleCreateModal,
  handleSelectedCard,
  clothingItems,
  handleEditProfileModal,
  onLogOut,
}) => {
  return (
    <div className="profile">
      <SideBar
        onLogOut={onLogOut}
        handleEditProfileModal={handleEditProfileModal}
      />
      <ClothesSection
        handleCreateModal={handleCreateModal}
        handleSelectedCard={handleSelectedCard}
        clothingItems={clothingItems}
      />
    </div>
  );
};

export default Profile;
