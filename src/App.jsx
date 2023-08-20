import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Admin from "./Admin";
import Guest from "./Guest";
import User from "./User";
import { GlobalContext } from "./Context/context";
import { decodeToken } from "react-jwt";

const ComponentByRole = {
  admin: Admin,
  user: User,
  guest: Guest,
};

const getUserRole = (role) =>
  ComponentByRole[role] || ComponentByRole["guest"];

const getDecodeToken = (token) => decodeToken(token) || null;

function App() {
  const { state} = useContext(GlobalContext);

  // const currentToken = getDecodeToken(state.token);

  // const CurrentUser = getUserRole(currentToken.role);

  const currentToken = state.token ? getDecodeToken(state.token) : null;

  const CurrentUser = currentToken ? getUserRole(currentToken.role) : ComponentByRole["guest"];
  return (
    <div>
      <CurrentUser />
    </div>
  );
}

export default App;


