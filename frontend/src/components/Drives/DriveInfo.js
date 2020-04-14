import React from "react";
import { DriveInfoWrapper } from "../../styled/containers";
import { CardHeading } from "../../styled/typography";

export const DriveInfo = ({ quantity, capacity }) => {
  return (
    <div>
      <DriveInfoWrapper>
        <CardHeading color="black">{capacity}</CardHeading>
      </DriveInfoWrapper>
      <DriveInfoWrapper>
        <CardHeading color="black">{quantity}</CardHeading>
      </DriveInfoWrapper>
    </div>
  );
};
