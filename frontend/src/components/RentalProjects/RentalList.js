import React, { useContext } from "react";

import { RentalCard } from "./RentalCard";
import { Grid } from "@material-ui/core";

import { useRentalFilter, useRentalSearch } from "../../utils";
import { RentalToolbarContext } from "../../pages/RentalsListPage";

export const RentalList = ({ rentals }) => {
  const { searchContext, filterContext } = useContext(RentalToolbarContext);

  let rentalList = useRentalFilter(
    rentals,
    filterContext.statusFilter,
    filterContext.configFilter,
    filterContext.typeFilter
  );

  rentalList = useRentalSearch(
    rentalList,
    searchContext.searchValue.toLowerCase()
  );

  return rentalList.map((rental) => (
    <Grid key={rental.id} item xs={12} sm={6} md={4} lg={3}>
      <RentalCard rental={rental} />
    </Grid>
  ));
};
