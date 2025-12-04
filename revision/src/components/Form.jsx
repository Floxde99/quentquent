import { useState } from "react";
import Users from "../pages/Users";
import Modal from "./Modal/Modal";

const Form = ({ addUser, users = [] }) => {
  const [formData, setFormData] = useState({ name: "", birthday: "" });
  const [modal, setModal] = useState({ open: false, message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.birthday) {
      setModal({ open: true, message: "Veuillez renseigner le nom et la date de naissance." });
      return;
    }
    addUser?.({ name: formData.name, birthday: new Date(formData.birthday) });
    setFormData({ name: "", birthday: "" });
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <label htmlFor="nom">nom</label>
        <input type="text" id="nom" name="name" placeholder="votre nom" value={formData.name} onChange={handleChange} />
        <label htmlFor="date">date de naissance</label>
        <input type="date" id="date" name="birthday" value={formData.birthday} onChange={handleChange} />
        <button type="submit">valider</button>
      </form>
      <Users users={users} />
      <Modal open={modal.open} title="Formulaire incomplet" message={modal.message} onClose={() => setModal({ open: false, message: "" })} />
    </div>
  );
};

export default Form;
