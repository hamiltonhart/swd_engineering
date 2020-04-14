import React from "react";
import { useModal } from "../../utils/";
import { Link } from "react-router-dom";

import { ContactDetailEditModal } from "../Contacts";

import { Typography } from "../../styled/typography";
import { SimpleDiv } from "../../styled/containers";
import { darkGrey } from "../../styled/defaults";

export const RentalContact = ({
  client,
  contactId,
  firstName,
  lastName,
  index
}) => {
  const { isShowing, toggle } = useModal();
  return (
    <SimpleDiv key={contactId} gridRow={`${index + 1}`} gridColumn="span 2">
      <Typography fontSize="18px" cursor="pointer" onClick={e => toggle()}>
        {client.client.firstName} {client.client.lastName}
      </Typography>
      <Typography fontColor={darkGrey} fontSize=".8em">
        {client.clientRole.replace(/_/g, " ")}
      </Typography>
      <ContactDetailEditModal
        toggleOverlay={toggle}
        isShowingOverlay={isShowing}
        contactId={contactId}
      />
    </SimpleDiv>
  );
};
