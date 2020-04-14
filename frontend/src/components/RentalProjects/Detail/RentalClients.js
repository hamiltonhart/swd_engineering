import React, { useState } from "react";
import { Link } from "react-router-dom";

import { RentalContact } from "../RentalContact";

import {
  SectionHeading,
  Typography,
  TextLink
} from "../../../styled/typography";
import { darkGrey } from "../../../styled/defaults";
import { Label } from "../../../styled/forms";
import {
  SimpleDiv,
  GridWrapper,
  InputWrapper,
  PositionWrapper
} from "../../../styled/containers";
import { WhiteButton } from "../../../styled/buttons";

import { Button, Select, MenuItem, InputLabel } from "@material-ui/core";
import { useStyles } from "../../../styling/materialStyling";

import { NewContactModal } from "../../Contacts";

export const RentalClients = ({ clients }) => {
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedClientRole, setSelectedClientRole] = useState("");

  const classes = useStyles();

  return (
    <SimpleDiv
      gridColumn="1 / 2"
      gridRow="1"
      justifySelf="start"
      padding="15px 21px 50px 21px"
      position="relative"
    >
      <SectionHeading gridColumn>Clients</SectionHeading>
      <GridWrapper padding="19px 30px" justifyItems="start" columns="1fr 1.5fr">
        <GridWrapper
          columns="1fr 1fr"
          margin="13px 8px 0 0"
          alignSelf="start"
          justifyItems="start"
          alignItems="baseline"
        >
          {clients.map((client, index) => (
            <RentalContact
              client={client}
              contactId={client.client.id}
              firstName={client.client.firstName}
              lastName={client.client.lastName}
              index={index}
            />
          ))}
        </GridWrapper>
        <GridWrapper as="form" columns="1fr 1fr" minWidth="100%">
          <InputWrapper margin="13px 0 0 0" gridColumn="span 2">
            {/* <InputLabel id="client-select-label" className={classes.label}>
              Client
            </InputLabel> */}
            <Select
              id="client-select-input"
              labelId="client-role-select-label"
              variant="outlined"
              color="primary"
              displayEmpty
              fullWidth
              value={selectedClient}
              onChange={e => setSelectedClient(e.target.value)}
            >
              <MenuItem value="" disabled>
                Client
              </MenuItem>
              <MenuItem value="Option A">George HartIsAGuy</MenuItem>
            </Select>
          </InputWrapper>
          <InputWrapper margin="13px 0 0 0" gridColumn="span 2">
            {/* <InputLabel id="client-role-select-label" className={classes.label}>
              Role
            </InputLabel> */}
            <Select
              id="client-role-select-input"
              labelId="client-role-select-label"
              variant="outlined"
              color="primary"
              placeholder="Client Role"
              fullWidth
              value={selectedClientRole}
              displayEmpty
              onChange={e => setSelectedClientRole(e.target.value)}
            >
              <MenuItem value="" disabled>
                Client Role
              </MenuItem>
              <MenuItem value="DX Mixer">DX Mixer</MenuItem>
              <MenuItem value="MX Mixer">MX Mixer</MenuItem>
              <MenuItem value="DX/MX Mixer">DX/MX Mixer</MenuItem>
              <MenuItem value="FX Mixer">FX Mixer</MenuItem>
              <MenuItem value="Recordist">Recordist</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </InputWrapper>
          <Button size="small" variant="outlined" fullWidth>
            Add / Edit Client
          </Button>
          <Button size="small" variant="outlined" fullWidth>
            Remove Client
          </Button>
        </GridWrapper>
        <PositionWrapper position="absolute" bottom="5%" right="10%">
          <NewContactModal blackButton />
        </PositionWrapper>
      </GridWrapper>
    </SimpleDiv>
  );
};
