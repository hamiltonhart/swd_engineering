import React, { useContext } from "react";
import { RentalToolbarContext } from "../../../pages/RentalsListPage";

import { FlexWrapper, InputWrapper } from "../../../styled/containers";
import { makeStyles, InputLabel, MenuItem, Select } from "@material-ui/core";

const useStyles = makeStyles({
  select: {
    minWidth: "150px",
    marginLeft: "8px",
  },
  label: {
    paddingLeft: "12px",
  },
  search: { marginRight: "8px" },
  gridContainer: {
    marginTop: "40px",
    marginLeft: "20px",
    marginRight: "20px",
    maxWidth: "100%",
  },
  cardActionHeading: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "20px 10px",
  },
});

export const RentalFiltering = () => {
  const {
    statusFilter,
    setStatusFilter,
    configFilter,
    setConfigFilter,
    typeFilter,
    setTypeFilter,
  } = useContext(RentalToolbarContext).filterContext;

  const classes = useStyles();
  return (
    <FlexWrapper>
      <InputWrapper width="none">
        <InputLabel className={classes.label} id="rental-status-filter-label">
          Status
        </InputLabel>
        <Select
          labelId="rental-status-filter-label"
          id="rental-status-filter-select"
          className={classes.select}
          defaultValue={statusFilter}
          color="primary"
          variant="outlined"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <MenuItem value="0">All</MenuItem>
          <MenuItem value="1">Current</MenuItem>
          <MenuItem value="2">Completed</MenuItem>
          <MenuItem value="3">Erased</MenuItem>
        </Select>
      </InputWrapper>
      <InputWrapper width="none">
        <InputLabel className={classes.label} id="rental-config-filter-label">
          Config
        </InputLabel>
        <Select
          labelId="rental-config-filter-label"
          id="rental-config-filter-select"
          className={classes.select}
          defaultValue={configFilter}
          color="primary"
          variant="outlined"
          onChange={(e) => setConfigFilter(e.target.value)}
        >
          <MenuItem value="0">All</MenuItem>
          <MenuItem value="1">Stereo</MenuItem>
          <MenuItem value="2">5.1</MenuItem>
          <MenuItem value="3">7.1</MenuItem>
          <MenuItem value="4">ATMOS</MenuItem>
          <MenuItem value="5">IMAX 6</MenuItem>
          <MenuItem value="6">IMAX 12</MenuItem>
        </Select>
      </InputWrapper>
      <InputWrapper width="none">
        <InputLabel className={classes.label} id="rental-type-filter-label">
          Type
        </InputLabel>
        <Select
          labelId="rental-type-filter-label"
          id="rental-type-filter-select"
          className={classes.select}
          defaultValue={typeFilter}
          color="primary"
          variant="outlined"
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <MenuItem value="0">All</MenuItem>
          <MenuItem value="1">Feature</MenuItem>
          <MenuItem value="2">Series</MenuItem>
        </Select>
      </InputWrapper>
    </FlexWrapper>
  );
};
