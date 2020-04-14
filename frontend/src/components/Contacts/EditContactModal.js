import React, { useState } from "react";
import InputMask from "react-input-mask";

import {
  DELETE_CONTACT,
  UPDATE_CONTACT,
  ALL_CONTACTS_QUERY,
  HOME_PAGE_QUERY
} from "../../gql";
import { useMutation } from "@apollo/react-hooks";

import { PageHeading } from "../../styled/typography";
import { GridWrapper, InputWrapper } from "../../styled/containers";
import { Input, Label, Select, Textarea, Required } from "../../styled/forms";

import { makeStyles, Button, ClickAwayListener } from "@material-ui/core";

const useStyles = makeStyles({
  deleteButton: {
    gridColumn: "4 / 10"
  }
});

export const EditContactModal = ({
  contactId,
  contact,
  toggleOverlay,
  toggleDetailEdit
}) => {
  const [firstName, setFirstName] = useState(contact.firstName);
  const [lastName, setLastName] = useState(contact.lastName);
  const [company, setCompany] = useState(contact.company || "");
  const [title, setTitle] = useState(contact.title || "");
  const [phone, setPhone] = useState(contact.phoneNumber || "");
  const [email, setEmail] = useState(contact.email || "");
  const [notes, setNotes] = useState(contact.notes || "");
  const [deleteActive, setDeleteActive] = useState(false);

  const [deleteContact, { error: deleteError }] = useMutation(DELETE_CONTACT);
  const [updateContact, { error: editError }] = useMutation(UPDATE_CONTACT);

  const deleteContactSubmit = (e, contactId) => {
    e.preventDefault();
    deleteContact({
      variables: { contactId: contactId },
      refetchQueries: [
        {
          query: ALL_CONTACTS_QUERY
        },
        { query: HOME_PAGE_QUERY, variables: { limit: 8, reverse: true } }
      ],
      onCompleted: contactDeleted()
    });
  };

  const formSubmit = (e, updateContact) => {
    e.preventDefault();
    updateContact({
      variables: {
        id: contactId,
        firstName,
        lastName,
        company,
        title,
        phoneNumber: phone,
        email,
        notes
      },
      onCompleted: contactUpdated()
    });
  };

  const contactDeleted = () => {
    toggleOverlay();
  };

  const contactUpdated = () => {
    toggleDetailEdit();
  };

  const classes = useStyles();
  return (
    <>
      <PageHeading>Edit Contact</PageHeading>
      <GridWrapper
        as="form"
        minWidth="622px;"
        maxWidth="622px;"
        margin="20px 0 0 0 "
        onSubmit={e => formSubmit(e, updateContact)}
      >
        <InputWrapper gridColumn="span 6">
          <Label>
            FirstName <Required>*</Required>
          </Label>
          <Input
            placeholder="John (required)"
            value={firstName}
            required
            onChange={e => setFirstName(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper gridColumn="span 6">
          <Label>
            LastName <Required>*</Required>
          </Label>
          <Input
            placeholder="Doe (required)"
            value={lastName}
            required
            onChange={e => setLastName(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper gridColumn="span 6">
          <Label>Company</Label>
          <Input
            placeholder="Technicolor"
            value={company}
            onChange={e => setCompany(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper gridColumn="span 6">
          <Label>Title</Label>
          <Input
            placeholder="Mixer"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper gridColumn="span 2">
          <Label>Country</Label>
          <Select>
            <option value="US" default>
              US
            </option>
            <option value="UK">UK</option>
            <option value="CA">CA</option>
          </Select>
        </InputWrapper>
        <InputWrapper gridColumn="span 4">
          <Label>Phone Number</Label>
          <Input
            as={InputMask}
            mask="(999) 999-9999"
            placeholder="(555) 555-5555"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper gridColumn="span 6">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="johndoe@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper gridColumn="span 12">
          <Label>Notes</Label>
          <Textarea
            placeholder="Something that may be useful to know."
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper gridColumn="4 / 10">
          {firstName && lastName && !deleteActive ? (
            <Button
              type="submit"
              size="large"
              color="primary"
              fullWidth
              variant="contained"
            >{`Save ${firstName}`}</Button>
          ) : (
            <Button
              type="submit"
              size="large"
              color="primary"
              fullWidth
              variant="contained"
              disabled
            >{`Save ${firstName}`}</Button>
          )}
        </InputWrapper>
        {deleteActive ? (
          <ClickAwayListener onClickAway={() => setDeleteActive(false)}>
            <Button
              className={classes.deleteButton}
              color="primary"
              variant="contained"
              size="small"
              fullWidth
              onClick={e => deleteContactSubmit(e, contactId)}
            >
              Delete
            </Button>
          </ClickAwayListener>
        ) : (
          <Button
            className={classes.deleteButton}
            color="primary"
            fullWidth
            size="small"
            onClick={e => setDeleteActive(!deleteActive)}
          >
            Delete
          </Button>
        )}
      </GridWrapper>
    </>
  );
};
