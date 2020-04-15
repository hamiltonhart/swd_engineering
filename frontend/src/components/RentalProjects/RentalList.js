import React, { useContext } from "react";

import { RentalCard } from "./RentalCard";
import { Grid } from "@material-ui/core";

import { useRentalFilter } from "../../utils";
import { RentalToolbarContext } from "../../pages/RentalsListPage";

export const RentalList = ({ rentals }) => {
  const { statusFilter, configFilter, typeFilter } = useContext(
    RentalToolbarContext
  ).filterContext;

  const rentalList = useRentalFilter(
    rentals,
    statusFilter,
    configFilter,
    typeFilter
  );

  return rentalList.map((rental) => (
    <Grid key={rental.id} item xs={12} sm={6} md={4} lg={3}>
      <RentalCard rental={rental} />
    </Grid>
  ));
};
