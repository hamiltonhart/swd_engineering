import React from "react";

import { MainWrapper, PageHeadingWrapper } from "../styled/containers";
import { PageHeading } from "../styled/typography";
import { HomePageContact } from "../components/Contacts";
import { HomePageRentals } from "../components/RentalProjects";
import { HomePageDrives } from "../components/Drives";

import { Loading, Error } from "../components/global";

import { HOME_PAGE_QUERY } from "../gql";
import { useQuery } from "@apollo/react-hooks";

const HomePage = () => {
  const { loading, error, data } = useQuery(HOME_PAGE_QUERY, {
    variables: { limit: 8, reverse: true }
  });

  return (
    <MainWrapper>
      {loading && <Loading />}
      {error && <Error error={error} />}
      {data && (
        <>
          <PageHeadingWrapper>
            <PageHeading>Summary</PageHeading>
          </PageHeadingWrapper>
          <HomePageDrives drives={data.drivesAvailable} />
          <HomePageRentals rentals={data.rentalProjects} />
          <HomePageContact contacts={data.contacts} />
        </>
      )}
    </MainWrapper>
  );
};

export default HomePage;
