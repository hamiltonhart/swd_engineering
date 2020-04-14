import React from "react";
import { Link } from "react-router-dom";
import { NavBarContainer, NavItem } from "../../styled/nav";
import { FlexWrapper } from "../../styled/containers";
import { Logout } from "./Logout";

export const NavBar = () => {
  return (
    <NavBarContainer>
      <FlexWrapper as="ul">
        <NavItem>
          <Link to="/contacts/">Contacts</Link>
        </NavItem>
        <NavItem>
          <Link to="/rentals/">Rentals</Link>
        </NavItem>
        <NavItem>
          <Link to="/drives/">Drives</Link>
        </NavItem>
        <NavItem secondary={true}>
          <Logout />
        </NavItem>
      </FlexWrapper>
    </NavBarContainer>
  );
};
