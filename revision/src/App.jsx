import "./App.css";
import Users from "./components/Users";
import Header from "./components/Header/Header";
import Form from "./components/Form";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

function App() {
  const initialUsers = [
    { id: 1, name: "Quentin", birthday: new Date("1996-03-25") },
    { id: 2, name: "Florian", birthday: new Date("1999-08-23") },
    { id: 3, name: "Yolo", birthday: new Date("2000-01-01") },
  ];
  const [users, setUsers] = useState(initialUsers);

  const addUser = (user) => {
    // ensure an id and correct birthday type
    const newUser = {
      id: user.id ?? Date.now(),
      name: user.name,
      birthday: user.birthday instanceof Date ? user.birthday : new Date(user.birthday),
    };
    setUsers((prev) => [newUser, ...prev]);
  };

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route index element={<Users users={users} />} />
          <Route path="/" element={<Users users={users} />} />
          <Route path="/users" element={<Users users={users} />} />
          <Route path="/form" element={<Form users={users} addUser={addUser} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
