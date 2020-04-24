import React, { useContext } from "react";

import { makeStyles, TextField } from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";

import { FlexWrapper } from "../../../styled/containers";

import { ContactPageContext } from "../../../pages/ContactsListPage";
import { ThemeConsumer } from "styled-components";

const useStyles = makeStyles((theme) => ({
  search: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export const ContactListSearch = () => {
  const { searchValue, setSearchValue } = useContext(
    ContactPageContext
  ).searchContext;

  const classes = useStyles();

  return (
    <FlexWrapper justifyContent="space-between">
      <TextField
        placeholder="Search"
        className={classes.search}
        value={searchValue}
        color="primary"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </FlexWrapper>
  );
};
