import styled from "styled-components";
import { black, red, darkGrey } from "../defaults";

export const PageHeading = styled.h1`
  font-size: 32px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  margin: 4px;
  }
`;

export const PageSubheading = styled.h2`
  font-size: 24px;
  font-weight: 300;
  text-transform: uppercase;
  text-align: center;
  margin: 4px;
`;

export const SectionHeading = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: ${black};
  text-transform: uppercase;
  transition: all 75ms ease-in-out;
  ${props => props.hover && "cursor: pointer"};

  &:hover {
    ${props => props.hover && `color: ${red}`}
  }
`;

export const CardHeading = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.color || `${red}`};
  padding: 6px 0 0 0;
  \ &:visited {
    color: ${props => props.color || `${red}`};
  }
`;

export const CardSubheading = styled.p`
  display: inline-block;
  font-style: ${props => props.fontStyle || "inherit"};
  font-size: 14px;
  margin: ${props => props.margin || "inherit"};
  color: ${props => props.color || `${darkGrey}`};
`;
