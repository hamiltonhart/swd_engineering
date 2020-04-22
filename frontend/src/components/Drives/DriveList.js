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
    "& tbody tr:hover": {
      boxShadow: theme.shadows[4],
      cursor: "pointer",
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

  const classes = useStyles();

  return (
    <>
      <DriveInfoHeading drives={driveList} />
      <Table className={classes.root} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Drive Number</TableCell>
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
    </>
  );
};
