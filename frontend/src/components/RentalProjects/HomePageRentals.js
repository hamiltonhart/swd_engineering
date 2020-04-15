import React from "react";
import { Link } from "react-router-dom";
import { FlexWrapper, GridWrapper } from "../../styled/containers";
import { SectionHeading } from "../../styled/typography";

import { makeStyles, Grid } from "@material-ui/core";

import { RentalCard } from "./RentalCard";
import { NewRentalModal } from "./NewRentalModal";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    marginLeft: "20px",
    marginRight: "20px",
    maxWidth: "100%",
  },
}));

export const HomePageRentals = ({ rentals }) => {
  const classes = useStyles();
  return (
    <>
      <FlexWrapper justifyContent="space-between" padding="19px 34px">
        <SectionHeading hover as={Link} to="/rentals/">
          Current Rentals
        </SectionHeading>

        <NewRentalModal homeButton={true} />
      </FlexWrapper>

      <div className={classes.gridContainer}>
        <Grid container spacing={2}>
          {rentals.map((rental) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <RentalCard key={rental.id} rental={rental} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};
