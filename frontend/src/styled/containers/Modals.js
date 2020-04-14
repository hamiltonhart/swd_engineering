import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  overflow-x: hidden;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalWrapper = styled.div`
  position: absolute;
  top: 10%;
  padding: ${props => props.padding || "60px 92px"};
  background-color: ${props => props.bgColor || "white"};
  border-radius: 10px;
`;
