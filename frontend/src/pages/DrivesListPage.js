import React, { useState } from "react";

import { useQuery } from "@apollo/react-hooks";
import { ALL_DRIVES_QUERY } from "../gql";

import { makeStyles } from "@material-ui/core";

import { MainWrapper, PageHeadingWrapper } from "../styled/containers";
import { PageHeading } from "../styled/typography";
import { DriveList } from "../components/Drives";
import { NewDriveModal } from "../components/Drives";
import { DriveListToolbar } from "../components/Drives/DriveUtilities";

const useStyles = makeStyles({
  cardActionHeading: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "20px 10px",
  },
});

export const DriveToolbarContext = React.createContext();

const DrivesListPage = () => {
  const [statusFilter, setStatusFilter] = useState("1");
  const [capacityFilter, setCapacityFilter] = useState("0");
  const [searchValue, setSearchValue] = useState("");

  const { data, loading, error } = useQuery(ALL_DRIVES_QUERY);

  const toolbarContext = {
    searchContext: {
      searchValue: searchValue,
      setSearchValue: setSearchValue,
    },
    filterContext: {
      statusFilter: statusFilter,
      setStatusFilter: setStatusFilter,
      capacityFilter: capacityFilter,
      setCapacityFilter: setCapacityFilter,
    },
  };

  const classes = useStyles();

  return (
    <MainWrapper>
      <PageHeadingWrapper>
        <PageHeading>Drives</PageHeading>
      </PageHeadingWrapper>

      <div className={classes.cardActionHeading}>
        <NewDriveModal />
      </div>

      <DriveToolbarContext.Provider value={toolbarContext}>
        <DriveListToolbar />
        {loading && <h1>Loading...</h1>}
        {error && <h1>{error.message}</h1>}
        {data && <DriveList drives={data.drives} />}
      </DriveToolbarContext.Provider>
    </MainWrapper>
  );
};

export default DrivesListPage;
