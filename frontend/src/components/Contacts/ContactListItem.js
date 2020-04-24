import React from "react";
import { makeStyles, Typography, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    borderRadius: 0,
    boxShadow: "none",
    cursor: "pointer",
    padding: theme.spacing(1),
  },
}));

export const ContactListItem = ({
  contact,
  setSelected,
  isShowingEdit,
  toggleEdit,
  isShowingNew,
  toggleNew,
}) => {
  const handleClick = () => {
    // If an edit window isShowing, toggle that closed and setSelected to the contact.id of the selected list item to display
    if (isShowingEdit) {
      toggleEdit();
      setSelected(contact.id);
    } else if (isShowingNew) {
      toggleNew();
      setSelected(contact.id);
    } else {
      setSelected(contact.id);
    }
  };

  const classes = useStyles();
  return (
    <Paper className={classes.root} onClick={() => handleClick()}>
      <Typography
        key={contact.id}
        variant="subtitle1"
      >{`${contact.firstName} ${contact.lastName}`}</Typography>
    </Paper>
  );
};
