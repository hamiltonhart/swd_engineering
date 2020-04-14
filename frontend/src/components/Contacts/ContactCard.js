import React from "react";
import { Card, FlexWrapper, SimpleDiv } from "../../styled/containers";
import { CardHeading, CardSubheading } from "../../styled/typography";

export const ContactCard = ({ toggleDetail, contact }) => {
  return (
    <Card margin="12px 0 0 0 " onClick={() => toggleDetail()}>
      <CardHeading>{`${contact.firstName} ${contact.lastName}`}</CardHeading>
      <FlexWrapper justifyContent="left" padding="0">
        <CardSubheading margin="0 0 0 10px">
          {contact.company || "---"}
        </CardSubheading>
        <CardSubheading margin="0 10px 0 10px">|</CardSubheading>
        <CardSubheading>{contact.title || "---"}</CardSubheading>
      </FlexWrapper>
      <SimpleDiv className="body__nohide" padding="8px 0">
        <p>
          {(contact.phoneNumber &&
            `(${contact.phoneNumber.slice(0, 3)}) ${contact.phoneNumber.slice(
              3,
              6
            )}-${contact.phoneNumber.slice(6)}`) ||
            "(---) --- ----"}
        </p>
        <p>{contact.email || "No Email"}</p>
      </SimpleDiv>
    </Card>
  );
};
