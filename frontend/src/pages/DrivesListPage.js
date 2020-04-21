import React, { useState, useEffect } from "react";

import { useQuery } from "@apollo/react-hooks";
import { ALL_DRIVES_QUERY } from "../gql";

import {
  makeStyles,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import {
  MainWrapper,
  PageHeadingWrapper,
  FlexWrapper,
  InputWrapper,
} from "../styled/containers";
import { PageHeading } from "../styled/typography";
import { DriveListInfo } from "../components/Drives";
import { NewDriveModal } from "../components/Drives";

const useStyles = makeStyles({
  select: {
    minWidth: "212px",
  },
  label: {
    paddingLeft: "12px",
  },
  cardActionHeading: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "20px 10px",
  },
  search: {},
  tempGrid: {
    border: "1px solid black",
    padding: "16px",
  },
  tempText: {
    border: "1px solid black",
  },
});

const DrivesListPage = () => {
  const [filterValue, setFilterValue] = useState("available");
  const [searchValue, setSearchValue] = useState("");

  const { data, loading, error } = useQuery(ALL_DRIVES_QUERY);

  const classes = useStyles();

  return (
    <MainWrapper>
      <PageHeadingWrapper>
        <PageHeading>Drives</PageHeading>
      </PageHeadingWrapper>
      <div className={classes.cardActionHeading}>
        <NewDriveModal />
      </div>

      <FlexWrapper justifyContent="space-between" alignItems="flex-end">
        <InputWrapper width="none">
          <InputLabel className={classes.label} id="drive-filter-label">
            Sorting
          </InputLabel>
          <Select
            labelId="drive-filter-label"
            id="drive-filter-select"
            className={classes.select}
            value={filterValue}
            color="primary"
            variant="outlined"
            onChange={(e) => setFilterValue(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="available">Available</MenuItem>
            <MenuItem value="unavailable">Unavailable</MenuItem>
          </Select>
        </InputWrapper>

        <InputWrapper width="auto">
          <InputLabel className={classes.label}>Search</InputLabel>
          <OutlinedInput
            placeholder="Number or Rental"
            value={searchValue}
            label="Search"
            color="primary"
            notched={false}
            endAdornment={<SearchIcon />}
            variant="outlined"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </InputWrapper>
      </FlexWrapper>

      {loading && <h1>Loading...</h1>}
      {error && <h1>{error.message}</h1>}
      {data && (
        <>
          <DriveListInfo drives={data.drives} filterValue={filterValue} />
        </>
      )}
    </MainWrapper>
  );
};

export default DrivesListPage;

{
  /* <Icon
  position="absolute"
  top="45%"
  right="10%"
  svgWidth="20px"
  cursor="pointer"
>
  <SearchIcon />
</Icon>; */
}
