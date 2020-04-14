import styled from "styled-components";
import { darkGrey, lightGrey } from "../defaults";

export const MainWrapper = styled.div`
  position: relative;
  min-height: calc(100vh - 286px);
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  background-color: ${props => props.bgColor || "white"};
`;

export const PageHeadingWrapper = styled.div`
  padding-top: 40px;
  padding-bottom: 22px;
  margin-bottom: 19px;
  width: 100%;
  border-bottom: 1px solid ${darkGrey};
`;

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || "repeat(12, 1fr)"};
  grid-gap: ${props => props.gridGap || "8px"};
  justify-items: ${props => props.justifyItems || "center"};
  padding: ${props => props.padding};
  box-sizing: border-box;
  ${props => props.columnGap && `column-gap: ${props.columnGap};`}
  ${props => props.rowGap && `row-gap: ${props.rowGap};`}
  ${props => props.minWidth && `min-width: ${props.minWidth};`}
  ${props => props.maxWidth && `max-width: ${props.maxWidth};`}
  ${props => props.margin && `margin: ${props.margin};`}
  ${props => props.alignCenter && `margin-left: auto; margin-right: auto;`}
  ${props => props.alignSelf && `align-self: ${props.alignSelf};`}
  ${props => props.alignItems && `align-items: ${props.alignItems};`}
  ${props => props.border && `border: ${props.border};`}
`;

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection || "row"};
  flex-wrap: ${props => props.wrap || "wrap"};
  justify-content: ${props => props.justifyContent || "center"};
  align-items: ${props => props.alignItems || "center"};
  padding: ${props => props.padding || "inherit"};
  max-width: ${props => props.maxWidth && `${props.maxWidth}`};
  border: ${props => props.border || "none"};
  border-radius: ${props => props.borderRadius || "none"};
    ${props => props.alignSelf && `align-self: ${props.alignSelf};`}
    ${props => props.justifySelf && `justify-self: ${props.justifySelf};`}
    ${props => props.gridRow && `grid-row: ${props.gridRow};`}
    ${props => props.gridColumn && `grid-column: ${props.gridColumn};`}
    ${props => props.margin && `margin: ${props.margin}`};
  ${props => props.width && `width: ${props.width};`}
  ${props => props.borderBottom && `border-bottom: ${props.borderBottom};`}
`;

export const InputWrapper = styled.div`
  position: relative;
  margin: ${props => props.margin || "13px 0px"};
  width: ${props => (!props.maxWidth && props.width) || "100%"};
  ${props => props.maxWidth && `max-width: ${props.maxWidth}`};
  ${props => props.marginLeft && `margin-left: ${props.marginLeft}`};
  ${props => props.marginRight && `margin-right: ${props.marginRight}`};
  ${props => props.marginTop && `margin-top: ${props.marginTop}`};
  ${props => props.marginBottom && `margin-bottom: ${props.marginBottom}`};
  ${props => props.gridColumn && `grid-column: ${props.gridColumn}`};
  ${props => props.gridRow && `grid-row: ${props.gridRow}`};
`;

export const DriveInfoWrapper = styled.div`
  display: inline-block;
  height: 35px;
  width: 89px;
  background-color: ${lightGrey};
  text-align: center;
  margin-left: 1px;
  margin-right: 1px;
`;

export const PositionWrapper = styled.div`
  position: ${props => props.position || "absolute"};
  ${props => props.top && `top: ${props.top};`}
  ${props => props.left && `left: ${props.left};`}
  ${props => props.bottom && `bottom: ${props.bottom};`}
  ${props => props.right && `right: ${props.right};`}
`;

export const SimpleDiv = styled.div`
  box-sizing: border-box;
  ${props => props.gridRow && `grid-row: ${props.gridRow};`}
  ${props => props.gridColumn && `grid-column: ${props.gridColumn};`}
  ${props => props.alignSelf && `align-self: ${props.alignSelf};`}
  ${props => props.justifySelf && `justify-self: ${props.justifySelf};`}
  ${props => props.padding && `padding: ${props.padding};`}
  ${props => props.position && `position: ${props.position};`}
  ${props => props.width && `width: ${props.width};`}
  ${props => props.bgColor && `background-color: ${props.bgColor};`}
  ${props => props.margin && `margin: ${props.margin};`}
  ${props => props.height && `height: ${props.height};`}
`;

export const SimpleSpan = styled.span`
  ${props => props.display && `display: ${props.display};`}
  ${props => props.textAlign && `text-align: ${props.textAlign};`}
  ${props => props.paddingLeft && `padding-left: ${props.paddingLeft};`}
  ${props => props.paddingRight && `padding-right: ${props.paddingRight};`}

`;
