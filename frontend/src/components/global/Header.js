import React from "react";
import { HeaderContainer } from "../../styled/containers";
import { Link } from "react-router-dom";
import { NavBar } from "./NavBar";

export const Header = () => {
  return (
    <HeaderContainer>
      <Link to="/">
        <h1>Logo</h1>
      </Link>
      <NavBar />
    </HeaderContainer>
  );
};
