import React, { useState } from "react";
import InputMask from "react-input-mask";
import { useModal } from "../../utils";

import { useMutation } from "@apollo/react-hooks";
import { CREATE_CONTACT, ALL_CONTACTS_QUERY, HOME_PAGE_QUERY } from "../../gql";

import { Button } from "@material-ui/core";

import { Modal, ModalArea, ModalCloseIcon } from "../utilities";
import { PageHeading } from "../../styled/typography";
import {
  GridWrapper,
  InputWrapper,
  PositionWrapper
} from "../../styled/containers";
import { Input, Label, Select, Textarea, Required } from "../../styled/forms";
import {
  RedButton,
  InactiveButton,
  RoundButton,
  BlackButton
} from "../../styled/buttons";
import { Error } from "../global";

export const NewContactModal = ({ redButton, roundButton, blackButton }) => {
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
        phoneNumber: phone
      },
      refetchQueries: [
        { query: ALL_CONTACTS_QUERY },
        { query: HOME_PAGE_QUERY, variables: { limit: 8, reverse: true } }
      ],
      onCompleted: createCompleted()
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

  return (
    <>
      {redButton && (
        <RedButton small onClick={() => toggle()}>
          New Contact
        </RedButton>
      )}
      {blackButton && (
        <Button
          size="small"
          color="secondary"
          variant="contained"
          onClick={() => toggle()}
        >
          New Contact
        </Button>
      )}
      {roundButton && (
        <PositionWrapper position="fixed" bottom="5%" right="4%">
          <RoundButton onClick={() => toggle()}>+</RoundButton>
        </PositionWrapper>
      )}
      <Modal isShowing={isShowing}>
        <ModalArea>
          <ModalCloseIcon toggle={toggle} />

          <PageHeading>New Contact</PageHeading>
          <GridWrapper
            as="form"
            minWidth="622px;"
            maxWidth="622px;"
            margin="20px 0 0 0 "
            onSubmit={e =>
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
                onChange={
                  e => setPhone(e.target.value)
                  //   e.target.value.isNaN ? null : setPhone(e.target.value)
                }
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
              {firstName && lastName ? (
                <RedButton minWidth="100%">{`Create ${firstName}`}</RedButton>
              ) : (
                <InactiveButton minWidth="100%" disabled>
                  Create Contact
                </InactiveButton>
              )}
            </InputWrapper>
          </GridWrapper>
          {error && <Error>{error.message}</Error>}
        </ModalArea>
      </Modal>
    </>
  );
};
