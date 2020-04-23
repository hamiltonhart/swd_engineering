import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import { ALL_CONTACTS_QUERY } from "../gql";

import { makeStyles } from "@material-ui/core";

import { MainWrapper, PageHeadingWrapper } from "../styled/containers";
import { PageHeading } from "../styled/typography";

import { NewContactModal, ContactList } from "../components/Contacts";

import { ContactsListToolbar } from "../components/Contacts/ContactUtilities";

const useStyles = makeStyles({
  cardActionHeading: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "20px 10px",
  },
  select: {
    minWidth: "212px",
  },
  label: {
    paddingLeft: "12px",
  },
  search: {},
});

export const ContactsToolbarContext = React.createContext();

const ContactsListPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("0");

  const { data, loading, error } = useQuery(ALL_CONTACTS_QUERY);

  const toolbarContext = {
    searchContext: {
      searchValue: searchValue,
      setSearchValue: setSearchValue,
    },
    sortContext: {
      sortValue: sortValue,
      setSortValue: setSortValue,
    },
  };

  const classes = useStyles();

  return (
    <MainWrapper>
      <PageHeadingWrapper>
        <PageHeading>Contacts</PageHeading>
      </PageHeadingWrapper>
      <div className={classes.cardActionHeading}>
        <NewContactModal />
      </div>
      <>
        <ContactsToolbarContext.Provider value={toolbarContext}>
          <ContactsListToolbar />
          {loading && <h1>Loading...</h1>}
          {error && <h1>{error.message}</h1>}
          {data && <ContactList contacts={data.contacts} />}
        </ContactsToolbarContext.Provider>
      </>
    </MainWrapper>
  );
};

export default ContactsListPage;
