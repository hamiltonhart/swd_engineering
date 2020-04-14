import React, { useState } from "react";

import { useQuery } from "@apollo/react-hooks";
import { GET_RENTALS_QUERY } from "../gql";

import {
  makeStyles,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";

import {
  MainWrapper,
  PageHeadingWrapper,
  GridWrapper,
  FlexWrapper,
  InputWrapper
} from "../styled/containers";
import { PageHeading } from "../styled/typography";
import { RentalCard } from "../components/RentalProjects";

import { NewRentalModal } from "../components/RentalProjects";

const useStyles = makeStyles({
  select: {
    minWidth: "150px",
    marginLeft: "8px"
  },
  label: {
    paddingLeft: "12px"
  },
  search: { marginRight: "8px" }
});

const RentalsListPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("1");
  const [configFilter, setConfigFilter] = useState("0");
  const [typeFilter, setTypeFilter] = useState("0");

  const { data, loading, error } = useQuery(GET_RENTALS_QUERY);

  const classes = useStyles();

  return (
    <MainWrapper>
      <PageHeadingWrapper>
        <PageHeading>Rentals</PageHeading>
      </PageHeadingWrapper>

      <FlexWrapper justifyContent="space-between">
        <FlexWrapper>
          <InputWrapper width="none">
            <InputLabel
              className={classes.label}
              id="rental-status-filter-label"
            >
              Status
            </InputLabel>
            <Select
              labelId="rental-status-filter-label"
              id="rental-status-filter-select"
              className={classes.select}
              defaultValue={statusFilter}
              color="primary"
              variant="outlined"
              onChange={e => setStatusFilter(e.target.value)}
            >
              <MenuItem value="0">All</MenuItem>
              <MenuItem value="1">Current</MenuItem>
              <MenuItem value="2">Completed</MenuItem>
              <MenuItem value="3">Erased</MenuItem>
            </Select>
          </InputWrapper>
          <InputWrapper width="none">
            <InputLabel
              className={classes.label}
              id="rental-config-filter-label"
            >
              Config
            </InputLabel>
            <Select
              labelId="rental-config-filter-label"
              id="rental-config-filter-select"
              className={classes.select}
              defaultValue={configFilter}
              color="primary"
              variant="outlined"
              onChange={e => setConfigFilter(e.target.value)}
            >
              <MenuItem value="0">All</MenuItem>
              <MenuItem value="1">Stereo</MenuItem>
              <MenuItem value="2">5.1</MenuItem>
              <MenuItem value="3">7.1</MenuItem>
              <MenuItem value="4">ATMOS</MenuItem>
              <MenuItem value="5">IMAX 6</MenuItem>
              <MenuItem value="6">IMAX 12</MenuItem>
            </Select>
          </InputWrapper>
          <InputWrapper width="none">
            <InputLabel className={classes.label} id="rental-type-filter-label">
              Type
            </InputLabel>
            <Select
              labelId="rental-type-filter-label"
              id="rental-type-filter-select"
              className={classes.select}
              defaultValue={typeFilter}
              color="primary"
              variant="outlined"
              onChange={e => setTypeFilter(e.target.value)}
            >
              <MenuItem value="0">All</MenuItem>
              <MenuItem value="1">Feature</MenuItem>
              <MenuItem value="2">Series</MenuItem>
            </Select>
          </InputWrapper>
        </FlexWrapper>

        <InputWrapper width="auto">
          <InputLabel className={classes.label}>Search</InputLabel>
          <OutlinedInput
            className={classes.search}
            placeholder="Title"
            value={searchValue}
            label="Search"
            color="primary"
            notched={false}
            endAdornment={<SearchIcon />}
            variant="outlined"
            onChange={e => setSearchValue(e.target.value)}
          />
        </InputWrapper>
      </FlexWrapper>
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error.message}</h1>}
      {data && (
        <GridWrapper padding="20px 20px">
          {data.rentalProjects.map(rental => (
            <RentalCard key={rental.id} rental={rental} />
          ))}
        </GridWrapper>
      )}

      <NewRentalModal />
    </MainWrapper>
  );
};

export default RentalsListPage;
