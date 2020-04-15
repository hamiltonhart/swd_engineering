import React, { useState } from "react";

import { useQuery } from "@apollo/react-hooks";
import { GET_RENTALS_QUERY } from "../gql";

import { makeStyles, Grid } from "@material-ui/core";

import { RentalListToolbar } from "../components/RentalProjects/RentalUtilities";

import { MainWrapper, PageHeadingWrapper } from "../styled/containers";
import { PageHeading } from "../styled/typography";
import { RentalList } from "../components/RentalProjects/RentalList";

import { NewRentalModal } from "../components/RentalProjects";

const useStyles = makeStyles({
  gridContainer: {
    marginTop: "40px",
    marginLeft: "20px",
    marginRight: "20px",
    maxWidth: "100%",
  },
  cardActionHeading: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "20px 10px",
  },
});

export const RentalToolbarContext = React.createContext();

const RentalsListPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("1");
  const [configFilter, setConfigFilter] = useState("0");
  const [typeFilter, setTypeFilter] = useState("0");

  const { data, loading, error } = useQuery(GET_RENTALS_QUERY);

  const toolbarContext = {
    searchContext: {
      searchValue: searchValue,
      setSearchValue: setSearchValue,
    },
    filterContext: {
      statusFilter: statusFilter,
      setStatusFilter: setStatusFilter,
      configFilter: configFilter,
      setConfigFilter: setConfigFilter,
      typeFilter: typeFilter,
      setTypeFilter: setTypeFilter,
    },
  };

  const classes = useStyles();

  return (
    <MainWrapper>
      <PageHeadingWrapper>
        <PageHeading>Rentals</PageHeading>
      </PageHeadingWrapper>

      <div className={classes.cardActionHeading}>
        <NewRentalModal />
      </div>
      <RentalToolbarContext.Provider value={toolbarContext}>
        <RentalListToolbar />

        {loading && <h1>Loading...</h1>}
        {error && <h1>{error.message}</h1>}
        {data && (
          <div className={classes.gridContainer}>
            <Grid container spacing={2}>
              <RentalList rentals={data.rentalProjects} />
            </Grid>
          </div>
        )}
      </RentalToolbarContext.Provider>
    </MainWrapper>
  );
};

export default RentalsListPage;
