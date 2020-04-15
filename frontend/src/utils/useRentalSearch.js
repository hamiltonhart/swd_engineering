export const useRentalSearch = (rentalList, searchValue) => {
  const returnList = [];
  if (searchValue === "") {
    return rentalList;
  } else {
    rentalList.map((rental) => {
      if (rental.title.toLowerCase().indexOf(searchValue) > -1) {
        returnList.push(rental);
      } else if (rental.abbreviation.toLowerCase().indexOf(searchValue) > -1) {
        returnList.push(rental);
      }
    });
  }
  return returnList;
};
