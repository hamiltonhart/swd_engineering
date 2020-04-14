import styled from "styled-components";
import { black, midGrey, red } from "../defaults";

export const NavItem = styled.li`
  margin: 0 20px;
  font-weight: bold;
  font-size: 18px;
  text-transform: uppercase;
  border: none;
  a,
  button {
    color: ${props => (props.secondary ? midGrey : black)};
    transition: all 75ms ease-in-out;
  }

  &:hover a,
  button {
    color: ${red};
  }
`;
