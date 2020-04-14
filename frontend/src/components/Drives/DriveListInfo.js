import React from "react";

import { GridWrapper } from "../../styled/containers";
import { DriveCard } from "./DriveCard";
import { DriveInfoHeading } from "./DriveInfoHeading";

import { useDrivesFilter } from "../../utils";

export const DriveListInfo = ({ drives, filterValue }) => {
  const filteredDrives = useDrivesFilter(drives, filterValue);
  return (
    <>
      <DriveInfoHeading drives={filteredDrives} />
      <GridWrapper padding="0 0 20px 0">
        {filteredDrives.map(drive => (
          <DriveCard key={drive.id} drive={drive} />
        ))}
      </GridWrapper>
    </>
  );
};
