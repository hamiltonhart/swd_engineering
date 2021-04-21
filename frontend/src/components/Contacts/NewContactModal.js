import React, { useState } from "react";
import InputMask from "react-input-mask";
import { useModal } from "../../utils";

import { useMutation } from "@apollo/react-hooks";
import { CREATE_CONTACT, ALL_CONTACTS_QUERY, HOME_PAGE_QUERY } from "../../gql";

import {
  makeStyles,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";

import { Modal, ModalArea, ModalCloseIcon } from "../utilities";
import { PageHeading } from "../../styled/typography";
import { GridWrapper, InputWrapper } from "../../styled/containers";
import { Error } from "../global";

const useStyles = makeStyles((theme) => ({
  button: {},
}));

export const NewContactModal = ({}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const { isShowing, toggle } = useModal();

  const [createContact, { error }] = useMutation(CREATE_CONTACT);

  const formSubmit = (
    e,
    firstName,
    lastName,
    company,
    title,
    phone,
    email,
    notes
  ) => {
    e.preventDefault();

    createContact({
      variables: {
        firstName,
        lastName,
        company,
        title,
        email,
        notes,
        phoneNumber: phone,
      },
      refetchQueries: [
        { query: ALL_CONTACTS_QUERY },
        { query: HOME_PAGE_QUERY, variables: { limit: 8, reverse: true } },
      ],
      onCompleted: createCompleted(),
    });
  };

  const createCompleted = () => {
    setFirstName("");
    setLastName("");
    setCompany("");
    setTitle("");
    setPhone("");
    setEmail("");
    setNotes("");
    toggle();
  };

  const classes = useStyles();
  return (
    <>
      <Button
        className={classes.button}
        size="small"
        color="primary"
        onClick={() => toggle()}
      >
        Create New Contact
      </Button>

      <Modal isShowing={isShowing}>
        <ModalArea>
          <ModalCloseIcon toggle={toggle} />

          <PageHeading>New Contact</PageHeading>
          <GridWrapper
            as="form"
            minWidth="622px;"
            maxWidth="622px;"
            margin="20px 0 0 0 "
            onSubmit={(e) =>
              formSubmit(
                e,
                firstName,
                lastName,
                company,
                title,
                phone,
                email,
                notes
              )
            }
          >
            <InputWrapper gridColumn="span 6">
              <TextField
                variant="outlined"
                label="First Name"
                InputLabelProps={{
                  shrink: true,
                }}
                required
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper gridColumn="span 6">
              <TextField
                variant="outlined"
                label="Last Name"
                InputLabelProps={{
                  shrink: true,
                }}
                required
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper gridColumn="span 6">
              <TextField
                variant="outlined"
                label="Company"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper gridColumn="span 6">
              <TextField
                variant="outlined"
                label="Title"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper gridColumn="span 2">
              <FormControl gridColumn="span 2" variant="outlined" fullWidth>
                <InputLabel id="country-input-label">Country</InputLabel>
                <Select
                  label="Country"
                  labelId="country-input-label"
                  defaultValue="US"
                >
                  <MenuItem value="US" default>
                    US
                  </MenuItem>
                  <MenuItem value="UK">UK</MenuItem>
                  <MenuItem value="CA">CA</MenuItem>
                </Select>
              </FormControl>
            </InputWrapper>
            <InputWrapper gridColumn="span 4">
              <TextField
                variant="outlined"
                label="PhoneNumber"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              {/* <Label>Phone Number</Label>
              <Input
                as={InputMask}
                mask="(999) 999-9999"
                placeholder="(555) 555-5555"
                value={phone}
                onChange={
                  (e) => setPhone(e.target.value)
                  //   e.target.value.isNaN ? null : setPhone(e.target.value)
                }
              /> */}
            </InputWrapper>
            <InputWrapper gridColumn="span 6">
              <TextField
                variant="outlined"
                label="Email"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper gridColumn="span 12">
              <TextField
                variant="outlined"
                label="Notes"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                multiline
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper gridColumn="4 / 10">
              <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                inactive={!firstName || !lastName}
              >
                Create Contact
              </Button>
            </InputWrapper>
          </GridWrapper>
          {error && <Error>{error.message}</Error>}
        </ModalArea>
      </Modal>
    </>
  );
};
