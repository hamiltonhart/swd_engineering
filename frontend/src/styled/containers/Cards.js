import styled from "styled-components";

export const Card = styled.div`
  position: relative;
  grid-column: ${props => props.gridColumns || "span 3"};
  height: 130px;
  width: 250px;
  padding: 8px 15px;
  border-radius: 10px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.25);
  transform: scaleY(1);
  transition: all 100ms ease-in-out;
  cursor: ${props => props.cursor || "pointer"};
  ${props => props.margin && `margin: ${props.margin}`};

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);

    .body {
      opacity: 0;
      transform: scaleY(0);
    }

    .hover-body {
      opacity: 1;
      transform: scaleY(1);
      transform-origin: top;
    }

    .hover-body__lower {
      opacity: 1;
      transform: scaleY(1);
      transform-origin: top;
    }
  }

  .handle-link {
    color: black;
  }

  .body {
    position: absolute;
    top: 50;
    left: 15;
    padding: 8px 0;
    transform: scaleY(1);
    transform-origin: bottom;
    transition: all 100ms ease-in-out;
    p,
    a {
      font-size: 14px;
      line-height: 1.5;
    }
  }

  .hover-body {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 50;
    left: 22%;
    opacity: 0;
    transform: scaleY(0);
    transition: all 100ms ease-in-out;
  }

  .body__nohide {
    position: absolute;
    top: 50;
    left: 15;
    transform: scaleY(1);
    transform-origin: bottom;
    transition: all 100ms ease-in-out;
    p,
    a {
      font-size: 14px;
      line-height: 1.5;
    }
  }
  .hover-body__lower {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 73px;
    left: 22%;
    opacity: 0;
    transform: scaleY(0);
    transition: all 100ms ease-in-out;
  }
`;
