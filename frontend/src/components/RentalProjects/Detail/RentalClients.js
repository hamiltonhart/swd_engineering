import React from "react";

import { RentalContact } from "../RentalContact";
import { SectionHeading } from "../../../styled/typography";
import { PositionWrapper } from "../../../styled/containers";

import { makeStyles, Grid } from "@material-ui/core";

import { RentalClientsManage } from "./RentalClientsManage";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    marginLeft: theme.spacing(6),
    paddingTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}));

export const RentalClients = ({ clients, rentalId }) => {
  const classes = useStyles();

  return (
    <>
      <SectionHeading gridColumn>Clients</SectionHeading>
      <div className={classes.root}>
        <Grid container spacing={2}>
          {/* Grid Left */}
          <Grid item container xs={12} md={6}>
            {clients.map((client, index) => (
              <Grid key={client.id} item xs={12}>
                <RentalContact client={client} contactId={client.client.id} />
              </Grid>
            ))}
          </Grid>
          {/* Grid Right */}
          <Grid
            item
            container
            xs={12}
            md={6}
            spacing={1}
            className={classes.testBorder}
          >
            <RentalClientsManage rentalId={rentalId} />
          </Grid>
        </Grid>
      </div>

      <PositionWrapper
        position="absolute"
        bottom="5%"
        right="10%"
      ></PositionWrapper>
      {/* </GridWrapper> */}
    </>
  );
};
