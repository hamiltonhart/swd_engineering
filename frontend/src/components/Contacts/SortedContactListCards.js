import React from "react";

import { GridWrapper } from "../../styled/containers";
import { ContactListCard } from "./ContactListCard";
import { useSortContactAlpha } from "../../utils";

export const SortedContactListCards = ({ contacts, sortBy }) => {
  const sortedContacts = useSortContactAlpha(contacts, true, sortBy);

  return (
    <GridWrapper padding="20px 20px">
      {sortedContacts.map(contact => (
        <ContactListCard contact={contact} />
      ))}
    </GridWrapper>
  );
};
