import React, { useState } from "react";

import { FlexWrapper } from "../../styled/containers";
import { DriveInfo } from "./DriveInfo";

import { useDrivesSort } from "../../utils";

export const DriveInfoHeading = ({ drives }) => {
  const { twoFifty, fiveHundred, oneTb, twoTb } = useDrivesSort(drives);
  return (
    <FlexWrapper justifyContent="space-around" padding="19px 100px 64px 100px">
      <DriveInfo capacity="250GB" quantity={twoFifty} />
      <DriveInfo capacity="500GB" quantity={fiveHundred} />
      <DriveInfo capacity="1TB" quantity={oneTb} />
      <DriveInfo capacity="2TB" quantity={twoTb} />
    </FlexWrapper>
  );
};
