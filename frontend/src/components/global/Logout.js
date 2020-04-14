import React from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { Link } from "react-router-dom";

export const Logout = () => {
  const client = useApolloClient();
  const userLogout = () => {
    localStorage.removeItem("authToken");
    client.writeData({ data: { isLoggedIn: false } });
  };

  return (
    <Link as="button" to="#" onClick={() => userLogout(client)}>
      Logout
    </Link>
  );
};
