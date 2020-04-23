import React from "react";

import { makeStyles, InputLabel, OutlinedInput } from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";

import { FlexWrapper, InputWrapper } from "../../../styled/containers";

import { ContactListFilter } from "./ContactListFilter";
import { ContactListSearch } from "./ContactListSearch";

const useStyles = makeStyles({
  select: {
    minWidth: "212px",
  },
  label: {
    paddingLeft: "12px",
  },
  search: {},
});

export const ContactsListToolbar = () => {
  const classes = useStyles();

  return (
    <FlexWrapper justifyContent="space-between">
      <ContactListFilter />
      <ContactListSearch />
    </FlexWrapper>
  );
};
