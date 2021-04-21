import React from "react";
import { useModal } from "../../utils/";
import { Link } from "react-router-dom";

import { ContactDetailEditModal } from "../Contacts";

import { Typography } from "../../styled/typography";
import { SimpleDiv } from "../../styled/containers";
import { darkGrey } from "../../styled/defaults";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
  },
  clientName: {
    "& hover": {
      color: theme.palette.primary.main,
    },
  },
}));

export const RentalContact = ({ client, contactId }) => {
  const { isShowing, toggle } = useModal();

  const classes = useStyles();
  return (
    <SimpleDiv className={classes.root}>
      <Typography
        className={classes.clientName}
        fontSize="18px"
        cursor="pointer"
        margin="0 0 4px 0"
        onClick={(e) => toggle()}
      >
        {client.client.firstName} {client.client.lastName}
      </Typography>
      <Typography fontColor={darkGrey} fontSize=".8em" margin="0 0 0 4px">
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
