import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

const Profile = ({
  handleCreateModal,
  handleSelectedCard,
  clothingItems,
  handleEditProfileModal,
  onLogOut,
  onCardLike,
  isLoggedIn,
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
        onCardLike={onCardLike}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
};

export default Profile;
