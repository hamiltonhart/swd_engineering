export const useDriveSearch = (driveList, searchValue) => {
  const returnList = [];
  if (searchValue === "") {
    return driveList;
  } else {
    driveList.map((drive) => {
      if (drive.driveNumber.toString().indexOf(searchValue) > -1) {
        returnList.push(drive);
      } else if (
        drive.rentalProjects.length > 0 &&
        drive.rentalProjects[0].project.title
          .toLowerCase()
          .indexOf(searchValue) > -1
      ) {
        returnList.push(drive);
      }
    });
  }
  return returnList;
};