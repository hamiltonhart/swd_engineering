import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import { ALL_CONTACTS_QUERY } from "../gql";

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
  FlexWrapper,
  InputWrapper
} from "../styled/containers";
import { PageHeading } from "../styled/typography";

import {
  NewContactModal,
  SortedContactListCards
} from "../components/Contacts";

const useStyles = makeStyles({
  select: {
    minWidth: "212px"
  },
  label: {
    paddingLeft: "12px"
  },
  search: {}
});

const ContactsListPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("first-name");

  const { data, loading, error } = useQuery(ALL_CONTACTS_QUERY);

  const classes = useStyles();

  return (
    <MainWrapper>
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error.message}</h1>}
      {data && (
        <>
          <PageHeadingWrapper>
            <PageHeading>Contacts</PageHeading>
          </PageHeadingWrapper>

          <FlexWrapper justifyContent="space-between">
            <InputWrapper width="none">
              <InputLabel className={classes.label} id="contact-filter-label">
                Sorting
              </InputLabel>
              <Select
                labelId="contact-filter-label"
                id="contact-filter-select"
                className={classes.select}
                defaultValue={sortValue}
                color="primary"
                variant="outlined"
                onChange={e => setSortValue(e.target.value)}
              >
                <MenuItem value="first-name">First Name</MenuItem>
                <MenuItem value="last-name">Last Name</MenuItem>
              </Select>
            </InputWrapper>

            <InputWrapper width="auto">
              <InputLabel className={classes.label}>Search</InputLabel>
              <OutlinedInput
                placeholder="First, Last, Company, Title"
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

          <SortedContactListCards contacts={data.contacts} sortBy={sortValue} />

          <NewContactModal roundButton />
        </>
      )}
    </MainWrapper>
  );
};

export default ContactsListPage;
