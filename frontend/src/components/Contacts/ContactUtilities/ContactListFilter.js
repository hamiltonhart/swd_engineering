import React, { useContext } from "react";

import {
  makeStyles,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";

import { FlexWrapper } from "../../../styled/containers";

import { ContactsToolbarContext } from "../../../pages/ContactsListPage";

const useStyles = makeStyles({
  select: {
    minWidth: "212px",
    marginLeft: "8px",
  },
  label: {
    paddingLeft: "12px",
  },
});

export const ContactListFilter = () => {
  const { sortValue, setSortValue } = useContext(
    ContactsToolbarContext
  ).sortContext;
  const classes = useStyles();

  return (
    <FlexWrapper>
      <FormControl variant="outlined">
        <InputLabel className={classes.label} id="contact-filter-label">
          Sorting
        </InputLabel>
        <Select
          labelId="contact-filter-label"
          id="contact-filter-select"
          label="Sorting"
          className={classes.select}
          defaultValue={sortValue}
          native={false}
          value={sortValue}
          color="primary"
          variant="outlined"
          onChange={(e) => setSortValue(e.target.value)}
        >
          <MenuItem value="0">First Name</MenuItem>
          <MenuItem value="1">Last Name</MenuItem>
        </Select>
      </FormControl>
    </FlexWrapper>
  );
};
