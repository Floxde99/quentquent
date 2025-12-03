import { useState } from "react";
import Users from "./Users";
import Modal from "./Modal/Modal";

const Form = ({ addUser, users = [] }) => {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !birthday) {
      setModalMessage("Veuillez renseigner le nom et la date de naissance.");
      setModalOpen(true);
      return;
    }
    const newUser = { name, birthday: new Date(birthday) };
    if (typeof addUser === "function") addUser(newUser);
    setName("");
    setBirthday("");
  }

  return (
    <>
      <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <label htmlFor="nom">nom</label>
        <input
          type="text"
          name="nom"
          placeholder="votre nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="date">date de naissance</label>
        <input
          type="date"
          name="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
        <button>valider</button>
      </form>
      <Users users={users} />
      <Modal
        open={modalOpen}
        title="Formulaire incomplet"
        message={modalMessage}
        onClose={() => setModalOpen(false)}
      />
      </div>
    </>
  );
};
export default Form;
