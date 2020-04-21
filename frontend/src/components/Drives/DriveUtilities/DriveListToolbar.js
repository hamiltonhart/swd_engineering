import React from "react";

import { DriveFiltering } from "./DriveFiltering";
import { DriveSearch } from "./DriveSearch";

import { FlexWrapper } from "../../../styled/containers";

export const DriveListToolbar = () => {
  return (
    <FlexWrapper justifyContent="space-between">
      <DriveFiltering />
      <DriveSearch />
    </FlexWrapper>
  );
};
