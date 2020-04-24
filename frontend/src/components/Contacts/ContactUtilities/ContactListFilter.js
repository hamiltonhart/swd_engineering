import React, { useContext } from "react";

import {
  makeStyles,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";

import { FlexWrapper } from "../../../styled/containers";

import { ContactPageContext } from "../../../pages/ContactsListPage";

const useStyles = makeStyles((theme) => ({
  select: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  label: {
    paddingLeft: "12px",
  },
}));

export const ContactListFilter = () => {
  const { sortValue, setSortValue } = useContext(
    ContactPageContext
  ).sortContext;
  const classes = useStyles();

  return (
    <FormControl variant="outlined" fullWidth>
      {/* <InputLabel className={classes.label} id="contact-filter-label">
          Sorting
        </InputLabel> */}
      <Select
        labelId="contact-filter-label"
        id="contact-filter-select"
        className={classes.select}
        defaultValue={sortValue}
        native={false}
        value={sortValue}
        color="primary"
        onChange={(e) => setSortValue(e.target.value)}
      >
        <MenuItem value="0">Sort by First Name</MenuItem>
        <MenuItem value="1">Sort by Last Name</MenuItem>
      </Select>
    </FormControl>
  );
};
