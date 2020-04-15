import React, { useContext } from "react";

import { RentalToolbarContext } from "../../../pages/RentalsListPage";

import { InputWrapper } from "../../../styled/containers";
import { makeStyles, InputLabel, OutlinedInput } from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
const useStyles = makeStyles({
  label: {
    paddingLeft: "12px",
  },
  search: { marginRight: "8px" },
});

export const RentalSearch = () => {
  const { searchValue, setSearchValue } = useContext(
    RentalToolbarContext
  ).searchContext;
  const classes = useStyles();
  return (
    <InputWrapper width="auto">
      <InputLabel className={classes.label}>Search</InputLabel>
      <OutlinedInput
        className={classes.search}
        placeholder="Title"
        value={searchValue}
        label="Search"
        color="primary"
        notched={false}
        endAdornment={<SearchIcon />}
        variant="outlined"
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </InputWrapper>
  );
};
