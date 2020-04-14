import styled from "styled-components";
import { black, red } from "../defaults";

export const Input = styled.input`
  padding: ${props => props.padding || "17px 32px"};
  border-radius: 10px;
  border: 1px solid ${black};
  font-size: 16px;
  width: ${props => props.width || "100%"};
  ${props => props.height && `height: ${props.height};`}
  ${props =>
    props.maxWidth && `max-width: ${props.maxWidth};`}
  box-sizing: border-box;

  &:focus {
    border-color: ${red};
  }
`;

export const Textarea = styled.textarea`
  padding: 17px 32px;
  border-radius: 10px;
  border: 1px solid ${black};
  font-size: 16px;
  width: ${props => props.width || "100%"};
  box-sizing: border-box;
  resize: none;
`;

export const Checkbox = styled.div`
  position: relative;
  input[type="checkbox"] {
    visibility: hidden;
    display: none;
  }

  input[type="checkbox"] + label {
    position: relative;
  }
  input[type="checkbox"] + label::before {
    content: "";
    position: absolute;
    display: flex;
    width: 38px;
    height: 38px;
    background-color: white;
    border: 1px solid ${black};
    border-radius: 10px;
  }

  [type="checkbox"]:active + label::before {
    border-color: ${red};
  }

  input[type="checkbox"] + label::after {
    content: "";
    position: absolute;
    left: 4px;
    top: 4px;

    font-size: 25px;
    width: 32px;
    height: 32px;
    color: black;
    background-color: ${red};
    border-radius: 10px;
    transition: all 75ms ease-in-out;
  }

  [type="checkbox"]:not(:checked) + ::after {
    opacity: 0;
    transform: scaleX(0);
  }

  [type="checkbox"]:checked + ::after {
    opacity: 1;
    transform: scaleX(1);
  }
`;

// <Checkbox>
//   <input type="checkbox" id="mycheckbox" value="hidden-checkbox" />
//   <label for="mycheckbox"></label>
// </Checkbox>

export const Select = styled.select`
    padding: ${props => props.padding || "16px 32px"};
    border-radius: 10px;
    border: 1px solid ${black};
    font-size: 16px;
    width: ${props => props.width || "100%"};
    box-sizing: border-box;
    ${props => props.maxWidth && `max-width: ${props.maxWidth};`}
    ${props => props.minWidth && `min-width: ${props.minWidth};`}

    -moz-appearance: none;
    -webkit-appearance: none;

    &:focus {
        border-color: ${red};
`;
