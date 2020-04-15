import React from "react";

import { RentalFiltering } from "./RentalFiltering";
import { RentalSearch } from "./RentalSearch";

import { FlexWrapper } from "../../../styled/containers";

export const RentalListToolbar = () => {
  return (
    <FlexWrapper justifyContent="space-between">
      <RentalFiltering />
      <RentalSearch />
    </FlexWrapper>
  );
};
