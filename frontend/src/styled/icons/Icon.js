import styled from "styled-components";

export const Icon = styled.div`
  display: ${props => props.display || "inline-block"};
  position: ${props => props.position || "relative"};
  top: ${props => props.top};
  left: ${props => props.left};
  bottom: ${props => props.bottom};
  right: ${props => props.right};
  cursor: ${props => props.cursor || "inherit"};
  background-color: ${props => props.bgColor || "transparent"};
  margin: ${props => props.margin || "0"};
  padding: ${props => props.padding || "0"};

  svg {
    ${props => props.svgWidth && `width: ${props.svgWidth};`}
    ${props => props.svgHeight && `height: ${props.svgHeight};`}
  }
`;
