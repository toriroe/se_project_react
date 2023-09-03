import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

const Profile = ({ handleCreateModal, handleSelectedCard }) => {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        handleCreateModal={handleCreateModal}
        handleSelectedCard={handleSelectedCard}
      />
    </div>
  );
};

export default Profile;
