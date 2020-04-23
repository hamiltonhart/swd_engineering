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

export const ContactListItem = ({ contact, setSelected }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} onClick={() => setSelected(contact.id)}>
      <Typography
        key={contact.id}
        variant="subtitle2"
      >{`${contact.firstName} ${contact.lastName}`}</Typography>
    </Paper>
  );
};
