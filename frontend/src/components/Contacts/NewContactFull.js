import React, { useState } from "react";

import { useMutation } from "@apollo/react-hooks";
import { CREATE_CONTACT, ALL_CONTACTS_QUERY } from "../../gql";

import { makeStyles, Typography, Button, TextField } from "@material-ui/core";

import { Error } from "../global";

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
  cancelButton: {
    marginRight: theme.spacing(1),
  },
}));

export const NewContactFull = ({ toggleNew, setContactId }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const [createContact, { error }] = useMutation(CREATE_CONTACT);

  const handleSubmit = (e) => {
    e.preventDefault();
    createContact({
      variables: {
        firstName,
        lastName,
        company,
        title,
        phoneNumber,
        email,
        notes,
      },
      refetchQueries: [{ query: ALL_CONTACTS_QUERY }],
      onCompleted: handleComplete(),
    });
  };

  const handleComplete = () => {
    toggleNew();
    setContactId(null);
  };

  const handleClose = () => {
    toggleNew();
  };

  const classes = useStyles();
  return (
    <>
      {error && <Error error={error} />}
      <div className={classes.heading}>
        <Typography align="left" variant="h4" color="primary">
          New Contact
        </Typography>
      </div>

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
            className={classes.cancelButton}
            variant="outlined"
            color="secondary"
            size="medium"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="medium"
          >
            Create
          </Button>
        </div>
      </form>
    </>
  );
};
