import React, { useState, useContext } from "react";

import { makeStyles, Paper } from "@material-ui/core";

import { useSortContactAlpha } from "../../utils";
import { useContactSearch } from "../../utils";
import { ContactsToolbarContext } from "../../pages/ContactsListPage";
import { ContactListItem } from "./ContactListItem";
import { ContactDetail } from "./ContactDetail";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(4),
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "80%",
    borderRadius: theme.shape.borderRadius,
    height: "500px",
    boxShadow: theme.shadows[2],
    "& > div": {
      borderRadius: 0,
    },
  },
  contactList: {
    minWidth: "300px",
    boxShadow: "none",
    borderRightStyle: "solid",
    borderColor: theme.palette.grey[400],
    borderWidth: "1px",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    overflowY: "auto",
    "& :hover": {
      backgroundColor: theme.palette.grey[400],
    },
  },
  contactInfo: {
    flexGrow: 1,
    minHeight: "300px",
    overflowY: "auto",
  },
}));

export const ContactList = ({ contacts }) => {
  const [selected, setSelected] = useState(1);
  const { searchContext, sortContext } = useContext(ContactsToolbarContext);

  let contactsList = useContactSearch(
    contacts,
    searchContext.searchValue.toLowerCase()
  );
  contactsList = useSortContactAlpha(contactsList, sortContext.sortValue);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.contactList}>
        {contactsList.map((contact) => (
          <ContactListItem
            key={contact.id}
            contact={contact}
            setSelected={setSelected}
          />
        ))}
      </Paper>
      <Paper className={classes.contactInfo} elevation={0}>
        <ContactDetail contactId={selected} />
      </Paper>
    </div>
  );
};
