import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Admin from "./Admin";
import Guest from "./Guest";
import User from "./User";

const ComponentByRole = {
  admin: Admin,
  user: User,
  guest: Guest,
};

const getUserRole = (params) =>
  ComponentByRole[params] || ComponentByRole["guest"];

function App() {
  const [role, setrole] = useState('admin');

  const CurrentUser = getUserRole(role);
  return (
    <div>
      <CurrentUser />
    </div>
  );
}

export default App;
