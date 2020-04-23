import React, { useContext } from "react";
import { DriveToolbarContext } from "../../../pages/DrivesListPage";

import { FlexWrapper, InputWrapper } from "../../../styled/containers";
import {
  makeStyles,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@material-ui/core";

const useStyles = makeStyles({
  select: {
    minWidth: "150px",
    marginLeft: "8px",
  },
  label: {
    paddingLeft: "12px",
  },
});

export const DriveFiltering = () => {
  const {
    statusFilter,
    setStatusFilter,
    capacityFilter,
    setCapacityFilter,
  } = useContext(DriveToolbarContext).filterContext;

  const classes = useStyles();
  return (
    <FlexWrapper>
      <FormControl variant="outlined">
        <InputLabel className={classes.label} id="drive-status-filter-label">
          Status
        </InputLabel>
        <Select
          labelId="drive-status-filter-label"
          id="drive-status-filter-select"
          label="Status"
          className={classes.select}
          defaultValue={statusFilter}
          color="primary"
          variant="outlined"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <MenuItem value="0">All</MenuItem>
          <MenuItem value="1">Available</MenuItem>
          <MenuItem value="2">Unavailable</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel className={classes.label} id="drive-capacity-filter-label">
          Capacity
        </InputLabel>
        <Select
          labelId="drive-capacity-filter-label"
          id="drive-capacity-filter-select"
          label="Capacity"
          className={classes.select}
          defaultValue={capacityFilter}
          color="primary"
          variant="outlined"
          onChange={(e) => setCapacityFilter(e.target.value)}
        >
          <MenuItem value="0">All</MenuItem>
          <MenuItem value="1">2TB</MenuItem>
          <MenuItem value="2">1TB</MenuItem>
          <MenuItem value="3">500GB</MenuItem>
          <MenuItem value="4">250GB</MenuItem>
        </Select>
      </FormControl>
    </FlexWrapper>
  );
};
