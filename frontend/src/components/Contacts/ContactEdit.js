import React, { useState } from "react";

import { useMutation } from "@apollo/react-hooks";
import { UPDATE_CONTACT } from "../../gql";

import {
  makeStyles,
  Typography,
  Button,
  TextField,
  InputLabel,
  FormControl,
  Select,
} from "@material-ui/core";

import { Error } from "../global";
import { ContactDeleteModal } from "./ContactDeleteModal";

import { useToggle } from "../../utils";

const useStyles = makeStyles((theme) => ({
  heading: {},
  detailBody: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "20% 80%",
    gridGap: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  label: {
    color: theme.palette.grey[700],
    fontSize: ".85em",
    alignSelf: "baseline",
    justifySelf: "stretch",
  },
  submit: {
    display: "flex",
    justifyContent: "flex-end",
  },
  deleteButton: {
    marginRight: theme.spacing(1),
  },
}));

export const ContactEdit = ({ contact, setContactId, toggleEdit }) => {
  const [firstName, setFirstName] = useState(contact.firstName);
  const [lastName, setLastName] = useState(contact.lastName);
  const [company, setCompany] = useState(contact.company);
  const [title, setTitle] = useState(contact.title);
  const [phoneNumber, setPhoneNumber] = useState(contact.phoneNumber);
  const [email, setEmail] = useState(contact.email);
  const [notes, setNotes] = useState(contact.notes);

  const [udpateContact, { error }] = useMutation(UPDATE_CONTACT);

  const { isShowing, toggle } = useToggle();

  const handleSubmit = (e) => {
    e.preventDefault();
    udpateContact({
      variables: {
        id: contact.id,
        firstName,
        lastName,
        company,
        title,
        phoneNumber,
        email,
        notes,
      },
      onCompleted: handleComplete(),
    });
  };

  const handleComplete = () => {
    toggleEdit();
  };

  const classes = useStyles();
  return (
    <>
      {error && <Error error={error} />}

      <form className={classes.detailBody} onSubmit={(e) => handleSubmit(e)}>
        <div className={classes.grid}>
          <Typography className={classes.label} align="right">
            First Name
          </Typography>
          <TextField
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className={classes.grid}>
          <Typography className={classes.label} align="right">
            Last Name
          </Typography>
          <TextField
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className={classes.grid}>
          <Typography className={classes.label} align="right">
            Company
          </Typography>
          <TextField
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className={classes.grid}>
          <Typography className={classes.label} align="right">
            Title
          </Typography>
          <TextField value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className={classes.grid}>
          <Typography className={classes.label} align="right">
            Phone
          </Typography>
          <TextField
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className={classes.grid}>
          <Typography className={classes.label} align="right">
            Email
          </Typography>
          <TextField value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className={classes.grid}>
          <Typography className={classes.label} align="right">
            Notes
          </Typography>
          <TextField
            multiline
            helperText="Can enter multiple lines."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div className={classes.submit}>
          <Button
            className={classes.deleteButton}
            variant="outlined"
            color="secondary"
            size="medium"
            onClick={toggle}
          >
            Delete
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="medium"
          >
            Confirm
          </Button>
        </div>
      </form>
      {isShowing && (
        <ContactDeleteModal
          contactId={contact.id}
          contactName={`${contact.firstName} ${contact.lastName}`}
          toggle={toggle}
          setContactId={setContactId}
        />
      )}
    </>
  );
};
