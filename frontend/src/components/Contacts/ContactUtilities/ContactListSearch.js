import React, { useContext } from "react";

import { makeStyles, TextField } from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";

import { FlexWrapper } from "../../../styled/containers";

import { ContactsToolbarContext } from "../../../pages/ContactsListPage";

const useStyles = makeStyles({
  search: { marginRight: "8px" },
});

export const ContactListSearch = () => {
  const { searchValue, setSearchValue } = useContext(
    ContactsToolbarContext
  ).searchContext;

  const classes = useStyles();

  return (
    <FlexWrapper justifyContent="space-between">
      <TextField
        placeholder="First, Last, Company, Title"
        className={classes.search}
        value={searchValue}
        label="Search"
        color="primary"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
        variant="outlined"
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </FlexWrapper>
  );
};
