import React from "react";
import { midGrey } from "../defaults";

export const SearchIcon = props => (
  <svg
    width={props.width || "27"}
    height={props.width || "27"}
    viewBox="0 0 27 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M17.249 4.61631C20.7374 8.10473 20.7374 13.7606 17.249 17.249C13.7606 20.7374 8.10472 20.7374 4.61631 17.249C1.1279 13.7606 1.1279 8.10473 4.61631 4.61631C8.10472 1.1279 13.7606 1.1279 17.249 4.61631ZM19.5697 17.637C22.9075 13.3481 22.6054 7.1443 18.6632 3.2021C14.3937 -1.06737 7.47155 -1.06737 3.20209 3.2021C-1.06736 7.47157 -1.06736 14.3937 3.20209 18.6632C7.14431 22.6054 13.3482 22.9076 17.6371 19.5697L25.0674 27L27 25.0674L19.5697 17.637Z"
      fill={props.fill || midGrey}
    />
  </svg>
);
