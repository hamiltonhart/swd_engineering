import React from "react";
import { Link } from "react-router-dom";

import { makeStyles, TableRow, TableCell } from "@material-ui/core";

import { EditDriveIcon } from "./EditDriveIcon";
import { ClearDriveProjectIcon } from "./ClearDriveProjectIcon";
import { DeleteDriveIcon } from "./DeleteDriveIcon";

const useStyles = makeStyles((theme) => ({
  root: {},
  actions: {
    width: "150px",
  },
  projectLink: {
    color: theme.palette.primary.main,
    fontSize: "1.1em",
  },
}));

export const DriveListItem = ({ drive }) => {
  const classes = useStyles();
  return (
    <TableRow key={drive.id} hover>
      <TableCell>{drive.driveNumber}</TableCell>
      <TableCell align="right">{drive.driveCapacityGb}</TableCell>
      <TableCell align="right">
        {drive.rentalProjects.length > 0 ? (
          <Link
            className={classes.projectLink}
            to={`/rentals/${drive.rentalProjects[0].project.id}`}
          >
            {drive.rentalProjects[0].project.title}
          </Link>
        ) : (
          "---"
        )}
      </TableCell>
      <TableCell align="right" className={classes.actions}>
        {drive.rentalProjects.length > 0 && (
          <ClearDriveProjectIcon
            drive={drive}
            driveProject={drive.rentalProjects[0]}
          />
        )}
        <EditDriveIcon drive={drive} />
        <DeleteDriveIcon drive={drive} />
      </TableCell>
    </TableRow>
  );
};
