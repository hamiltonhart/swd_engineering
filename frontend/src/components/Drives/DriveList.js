import React, { useContext } from "react";

import {
  makeStyles,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";

import { useDrivesFilter, useDriveSearch } from "../../utils";
import { DriveToolbarContext } from "../../pages/DrivesListPage";
import { DriveListItem } from "./DriveListItem";
import { DriveInfoHeading } from "./DriveInfoHeading";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "800px",
    "& th": {
      fontWeight: 600,
    },
    "& table tbody tr:hover": {
      boxShadow: theme.shadows[4],
    },
  },
}));

export const DriveList = ({ drives }) => {
  const { searchContext, filterContext } = useContext(DriveToolbarContext);

  let driveList = useDrivesFilter(
    drives,
    filterContext.statusFilter,
    filterContext.capacityFilter
  );

  driveList = useDriveSearch(
    driveList,
    searchContext.searchValue.toLowerCase()
  );

  // Sort drives by drive number in ascending order
  driveList = driveList.sort(function (a, b) {
    return a.driveNumber - b.driveNumber;
  });

  const classes = useStyles();

  return (
    <>
      <DriveInfoHeading drives={driveList} />
      <div className={classes.root}>
        <Table className={classes.root} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell align="right">Capacity</TableCell>
              <TableCell align="right">Current Project</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {driveList.map((drive) => (
              <DriveListItem key={drive.id} drive={drive} />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
