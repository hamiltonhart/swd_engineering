export const useRentalFilter = (
  rentalList,
  filterStatus,
  filterConfig,
  filterType
) => {
  function filteredStatus(rentalList, filterValue) {
    switch (filterValue) {
      case "1":
        return rentalList.filter(
          (rental) => !rental.isMixingComplete && !rental.isProjectComplete
        );
      case "2":
        return rentalList.filter(
          (rental) => !rental.isProjectComplete && rental.isMixingComplete
        );
      case "3":
        return rentalList.filter(
          (rental) => rental.isProjectComplete && rental.isMixingComplete
        );
      case "0":
        return rentalList;
      default:
        return rentalList;
    }
  }

  function filteredConfig(filteredList, filterValue) {
    switch (filterValue) {
      case "0":
        return filteredList;
      case "1":
        return filteredList.filter(
          (rental) => rental.channelConfig === "Stereo"
        );
      case "2":
        return filteredList.filter((rental) => rental.channelConfig === "5.1");
      case "3":
        return filteredList.filter((rental) => rental.channelConfig === "7.1");
      case "4":
        return filteredList.filter(
          (rental) => rental.channelConfig === "ATMOS"
        );
      case "5":
        return filteredList.filter(
          (rental) => rental.channelConfig === "IMAX 6"
        );
      case "6":
        return filteredList.filter(
          (rental) => rental.channelConfig === "IMAX 12"
        );
      default:
        return filteredList;
    }
  }

  function filteredType(filteredList, filterValue) {
    switch (filterValue) {
      case "0":
        return filteredList;
      case "1":
        return filteredList.filter((rental) => !rental.season);
      case "2":
        return filteredList.filter((rental) => rental.season);
      default:
        return filteredList;
    }
  }

  let filteredList = filteredStatus(rentalList, filterStatus);
  filteredList = filteredConfig(filteredList, filterConfig);
  filteredList = filteredType(filteredList, filterType);
  return filteredList;
};
{
  /* <MenuItem value="0">All</MenuItem>
<MenuItem value="1">Stereo</MenuItem>
<MenuItem value="2">5.1</MenuItem>
<MenuItem value="3">7.1</MenuItem>
<MenuItem value="4">ATMOS</MenuItem>
<MenuItem value="5">IMAX 6</MenuItem>
<MenuItem value="6">IMAX 12</MenuItem> */
}
