import React from "react";
import { Link } from "react-router-dom";
import { FlexWrapper, GridWrapper } from "../../styled/containers";
import { SectionHeading } from "../../styled/typography";

import { RentalCard } from "./RentalCard";
import { NewRentalModal } from "./NewRentalModal";

export const HomePageRentals = ({ rentals }) => {
  return (
    <>
      <FlexWrapper justifyContent="space-between" padding="19px 34px">
        <SectionHeading hover as={Link} to="/rentals/">
          Current Rentals
        </SectionHeading>

        <NewRentalModal homeButton={true} />
      </FlexWrapper>

      <GridWrapper padding="0 0 113px 0">
        {rentals.map(rental => (
          <RentalCard key={rental.id} rental={rental} />
        ))}
      </GridWrapper>
    </>
  );
};
