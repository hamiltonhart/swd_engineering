import React, { useContext } from "react";

import { DriveToolbarContext } from "../../../pages/DrivesListPage";

import { makeStyles, TextField } from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
const useStyles = makeStyles({
  label: {
    paddingLeft: "12px",
  },
  search: { marginRight: "8px" },
});

export const DriveSearch = () => {
  const { searchValue, setSearchValue } = useContext(
    DriveToolbarContext
  ).searchContext;
  const classes = useStyles();
  return (
    <TextField
      className={classes.search}
      id="drive-search-input"
      label="Search"
      variant="outlined"
      color="primary"
      value={searchValue}
      placeholder="Number or Show Title"
      onChange={(e) => setSearchValue(e.target.value)}
      InputProps={{
        endAdornment: <SearchIcon />,
      }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};
