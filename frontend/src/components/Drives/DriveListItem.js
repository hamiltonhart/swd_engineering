import React from "react";

import { TableRow, TableCell } from "@material-ui/core";

export const DriveListItem = ({ drive }) => {
  return (
    <TableRow key={drive.id} hover>
      <TableCell>{drive.driveNumber}</TableCell>
      <TableCell>{drive.driveCapacityGb}</TableCell>
      <TableCell>
        {drive.currentProject ? drive.currentProject.title : "---"}
      </TableCell>
    </TableRow>
  );
};
