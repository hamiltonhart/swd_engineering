import styled from "styled-components";
import { darkGrey } from "../defaults";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 93px;
  padding: 0 3%;
  box-sizing: border-box;
  border-bottom: 2px solid ${darkGrey};
`;
