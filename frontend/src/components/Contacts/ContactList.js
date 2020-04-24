import React, { useState, useContext } from "react";

import { makeStyles, Paper, Button, Typography } from "@material-ui/core";

import { useSortContactAlpha, useContactSearch, useToggle } from "../../utils";
import { ContactPageContext } from "../../pages/ContactsListPage";
import { ContactListItem } from "./ContactListItem";
import { ContactDetail } from "./ContactDetail";
import { ContactListFilter, ContactListSearch } from "./ContactUtilities";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    maxWidth: "100%",
    borderRadius: theme.shape.borderRadius,
    height: "800px",
    maxHeight: "100%",
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
  },
  clearButton: {
    display: "block",
    marginTop: theme.spacing(1),
    marginLeft: "auto",
    marginRight: "auto",
  },
  contactListItems: {
    marginTop: theme.spacing(1),
    "& :hover": {
      backgroundColor: theme.palette.grey[400],
    },
  },
  contactInfo: {
    flexGrow: 1,
    minHeight: "300px",
    overflowY: "auto",
    padding: theme.spacing(2),
  },
  contactInfoContainer: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

export const ContactList = ({ contacts }) => {
  // Set to the id of the contact that is selected from the contact list or null by default
  const [selected, setSelected] = useState(null);

  // Indicates if the edit window for a contact is showing or not.
  // Gets passed to the ContactListItem to determine of the edit needs to be closed when selecting a new item
  // Gets passed to the ContactDetail to determine if the detail or edit view is shown
  const { isShowing: isShowingEdit, toggle: toggleEdit } = useToggle();
  const { isShowing: isShowingNew, toggle: toggleNew } = useToggle();

  const { searchContext, sortContext } = useContext(ContactPageContext);

  // Gets the contact list to be mapped through based on sorting and search
  let contactsList = useContactSearch(
    contacts,
    searchContext.searchValue.toLowerCase()
  );
  contactsList = useSortContactAlpha(contactsList, sortContext.sortValue);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.contactList}>
        <ContactListSearch />
        <ContactListFilter />

        {/* If a search value is present, show the clear search button */}
        {searchContext.searchValue && (
          <Button
            className={classes.clearButton}
            color="primary"
            onClick={() => searchContext.setSearchValue("")}
          >
            Clear Search
          </Button>
        )}
        {contactsList.length > 0 ? (
          <div className={classes.contactListItems}>
            {contactsList.map((contact) => (
              <ContactListItem
                key={contact.id}
                contact={contact}
                setSelected={setSelected}
                isShowingEdit={isShowingEdit}
                toggleEdit={toggleEdit}
                isShowingNew={isShowingNew}
                toggleNew={toggleNew}
              />
            ))}
          </div>
        ) : (
          <Typography align="center" variant="h5">
            No Items To Display
          </Typography>
        )}
      </Paper>
      <Paper className={classes.contactInfo} elevation={0}>
        <div className={classes.contactInfoContainer}>
          <ContactDetail
            contactId={selected}
            setContactId={setSelected}
            isShowingEdit={isShowingEdit}
            toggleEdit={toggleEdit}
            isShowingNew={isShowingNew}
            toggleNew={toggleNew}
          />
        </div>
      </Paper>
    </div>
  );
};
