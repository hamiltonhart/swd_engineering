import React from "react";
import { midGrey } from "../defaults";

export const CloseIcon = props => (
  <svg
    width={props.width || "23"}
    height={props.height || "23"}
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.45414 1.74695L21.2531 21.5459M20.8597 2.06065L1.06067 21.8596"
      stroke={`${midGrey}`}
      strokeWidth={props.strokeWidth || "3"}
    />
  </svg>
);
