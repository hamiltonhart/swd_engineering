import styled from "styled-components";
import { redDot, greenDot, yellowDot } from "../defaults";

const colors = [greenDot, yellowDot, redDot];

export const Dot = styled.div`
  display: inline-block;
  height: 11px;
  width: 11px;
  border-radius: 50%;
  margin-right: 9px;
  background-color: ${props => colors[props.color]};
`;
