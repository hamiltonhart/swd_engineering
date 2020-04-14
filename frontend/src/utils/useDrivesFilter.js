export const useDrivesFilter = (drivesList, filterValue) => {
  function filtered(drivesList, filterValue) {
    switch (filterValue) {
      case "available":
        return drivesList.filter(drive => drive.rentalProjects.length === 0);
      case "unavailable":
        return drivesList.filter(drive => drive.rentalProjects.length === 1);
      case "all":
        return drivesList;
    }
  }

  const filteredList = filtered(drivesList, filterValue);
  return filteredList;
};
