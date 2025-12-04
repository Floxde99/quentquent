import User from "../components/User";

// Users accepts an optional `users` prop; otherwise uses default sample data
const Users = ({ users } = {}) => {
  const defaultUsers = [
    { id: 1, name: "Quentin", birthday: new Date("1996-03-25") },
    { id: 2, name: "Florian", birthday: new Date("1999-08-23") },
    { id: 3, name: "Yolo", birthday: new Date("2000-01-01") },
  ];
  const list = Array.isArray(users) ? users : defaultUsers;

  return (
    <section id="users" className="users-list">
      {list.map((user) => (
        <User key={user.id} {...user} />
      ))}
    </section>
  );
};
export default Users;
