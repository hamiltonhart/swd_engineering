import React from "react";
import { Link } from "react-router-dom";
import { FlexWrapper, GridWrapper } from "../../styled/containers";
import { SectionHeading } from "../../styled/typography";

import { ContactListCard } from "./ContactListCard";

import { NewContactModal } from "./NewContactModal";

export const HomePageContact = ({ contacts }) => {
  return (
    <>
      <FlexWrapper justifyContent="space-between" padding="19px 34px">
        <SectionHeading hover as={Link} to="/contacts/">
          Contacts
        </SectionHeading>

        <NewContactModal redButton={true} />
      </FlexWrapper>
      <GridWrapper padding="0 0 20px 0">
        {contacts.map(contact => (
          <ContactListCard key={contact.id} contact={contact} />
        ))}
      </GridWrapper>
    </>
  );
};
