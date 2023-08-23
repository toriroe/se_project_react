import "./AddItemModal.css";

const AddItemModal = () => {
  return (
    <div>
      <label>
        Name
        <input type="text" name="name" minLength="1" maxLength="30" />
      </label>
      <label>
        Image
        <input type="url" name="link" minLength="1" maxLength="30" />
      </label>
      <p>Select the weather type:</p>
      <div>
        <div>
          <input type="radio" id="hot" value="hot" />
          <label> Hot </label>
        </div>
        <div>
          <input type="radio" id="warm" value="warm" />
          <label> Warm </label>
        </div>
        <div>
          <input type="radio" id="Cold" value="cold" />
          <label> Cold </label>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
