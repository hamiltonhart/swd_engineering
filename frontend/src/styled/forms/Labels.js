import styled from "styled-components";
import { red, darkGrey } from "../defaults";

export const Label = styled.label`
  display: block;
  font-size: 16px;
  color: ${darkGrey};
  padding-left: 12px;
`;

export const Required = styled.span`
  color: ${red};
`;
