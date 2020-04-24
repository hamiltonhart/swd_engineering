import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import { ALL_CONTACTS_QUERY } from "../gql";

import { makeStyles } from "@material-ui/core";

import { MainWrapper, PageHeadingWrapper } from "../styled/containers";
import { PageHeading } from "../styled/typography";

import { ContactList } from "../components/Contacts";

export const ContactPageContext = React.createContext();

const useStyles = makeStyles({
  root: {
    position: "relative",
  },
});

const ContactsListPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("0");

  const { data, loading, error } = useQuery(ALL_CONTACTS_QUERY);

  const contactPageContext = {
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

      <div className={classes.root}>
        <ContactPageContext.Provider value={contactPageContext}>
          {loading && <h1>Loading...</h1>}
          {error && <h1>{error.message}</h1>}
          {data && <ContactList contacts={data.contacts} />}
        </ContactPageContext.Provider>
      </div>
    </MainWrapper>
  );
};

export default ContactsListPage;
