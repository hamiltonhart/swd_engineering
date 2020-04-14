import styled from "styled-components";
import { black, red, darkGrey, midGrey } from "../defaults";

export const Button = styled.button`
  font-family: inherit;
  padding: ${props => (props.small ? "5px 30px" : "30px 30px")};
  font-weight: 700;
  font-size: ${props => (props.small ? "14px" : "16px")};
  border-radius: 10px;
  border: 3px solid transparent;
  text-transform: uppercase;
  text-align: center;
  box-sizing: border-box;
  box-shadow: ${props => props.boxShadow || "2px 4px 4px rgba(0, 0, 0, 0.25)"};
  cursor: pointer;
  min-width: ${props => props.minWidth};
  ${props => props.margin && `margin: ${props.margin};`}
  ${props => props.fill && "width: 100%;"}
  ${props => props.zIndex && `z-index: ${props.zIndex};`}
  ${props => props.padding && `padding: ${props.padding};`}
  transition: all 75ms ease-in-out;

  &:hover {
    background-color: ${red};
    border-color: transparent;
    color: white;
  }
`;

export const BlackButton = styled(Button)`
  color: white;
  background-color: ${black};
`;

export const RedButton = styled(Button)`
  color: white;
  background-color: ${red};
`;

export const InactiveButton = styled(Button)`
  color: ${darkGrey};
  background-color: ${midGrey};
  box-shadow: none;

  &:hover {
    background-color: ${midGrey};
    border-color: transparent;
    color: ${darkGrey};
    cursor: initial;
  }
`;

export const WhiteButton = styled(Button)`
  color: ${black};
  background-color: white;
  border: 3px solid ${black};
  ${props =>
    props.borderThin && `border: 1px solid ${black}; font-weight: 300;`}
  ${props => props.borderThin && props.small && `padding: 7px 30px;`}
`;

export const RoundButton = styled(Button)`
  color: ${props => props.color || "white"};
  height: ${props => props.size || "61px"};
  width: ${props => props.size || "61px"};
  font-size: ${props => props.fontSize || "28px"};
  background-color: ${props => props.bgColor || red};
  ${props => props.boxShadow && `box-shadow: ${props.boxShadow}`};
  ${props => props.margin && `margin: ${props.margin};`}
  ${props =>
    props.alignSelf && `align-self: ${props.alignSelf};`}
  border-radius: 50%;
  text-align: center;
  padding: 0;
`;
