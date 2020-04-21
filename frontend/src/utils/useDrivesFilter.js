export const useDrivesFilter = (drivesList, filterStatus, filterCapacity) => {
  function getFilterStatusList(drivesList, filterStatus) {
    switch (filterStatus) {
      case "1":
        return drivesList.filter((drive) => drive.rentalProjects.length === 0);
      case "2":
        return drivesList.filter((drive) => drive.rentalProjects.length === 1);
      case "0":
        return drivesList;
      default:
        return drivesList;
    }
  }

  function getFilterCapacityList(drivesList, filterCapacity) {
    switch (filterCapacity) {
      case "1":
        return drivesList.filter((drive) => drive.driveCapacityGb === "2TB");
      case "2":
        return drivesList.filter((drive) => drive.driveCapacityGb === "1TB");
      case "3":
        return drivesList.filter((drive) => drive.driveCapacityGb === "500GB");
      case "4":
        return drivesList.filter((drive) => drive.driveCapacityGb === "250GB");
      case "0":
        return drivesList;
      default:
        return drivesList;
    }
  }

  const filteredStatusList = getFilterStatusList(drivesList, filterStatus);
  const filteredCapacityList = getFilterCapacityList(
    filteredStatusList,
    filterCapacity
  );
  return filteredCapacityList;
};
