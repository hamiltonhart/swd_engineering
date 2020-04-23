export const useContactSearch = (contactList, searchValue) => {
  const returnList = [];
  if (searchValue === "") {
    return contactList;
  } else {
    contactList.map((contact) => {
      if (
        contact.firstName.toLowerCase().indexOf(searchValue) > -1 ||
        contact.lastName.toLowerCase().indexOf(searchValue) > -1
      ) {
        returnList.push(contact);
      }
    });
  }
  return returnList;
};
