import styled from "styled-components";
import { red, black } from "../defaults";

export const TextLink = styled.a`
  color: ${props => props.color || red};
  font-size: ${props => props.fontSize || "14px"};
  display: ${props => props.display || "block"};
  ${props => props.gridColumn && `grid-column: ${props.gridColumn};`}
  ${props => props.gridRow && `grid-row: ${props.gridRow};`}
  ${props => props.margin && `margin: ${props.margin};`}
  ${props => props.justifySelf && `justify-self: ${props.justifySelf};`}
  ${props => props.padding && `padding: ${props.padding};`}
  cursor: pointer;

  &:visited {
    color: {red};
  }

  &:hover.hover{
    font-weight: 700;
  }
`;

export const CardText = styled.p`
  font-size: 14px;
`;

export const Typography = styled.p`
  color: ${props => props.fontColor || { black }};
  display: ${props => props.display || "block"};
  font-size: ${props => props.fontSize || "16px"};
  ${props => props.fontWeight && `font-weight: ${props.fontWeight};`}
  ${props => props.margin && `margin: ${props.margin};`}
  ${props => props.padding && `padding: ${props.padding};`}
  ${props => props.justifySelf && `justify-self: ${props.justifySelf};`}
  ${props => props.highlight && `font-weight: 700px; color: ${red};`}
  ${props => props.gridColumn && `grid-column: ${props.gridColumn};`}
  ${props => props.gridRow && `grid-row: ${props.gridRow};`}
  ${props => props.cursor && `cursor: ${props.cursor};`}

  &:hover.hover{
    font-weight: 700;
    color: ${red};
  }
`;
