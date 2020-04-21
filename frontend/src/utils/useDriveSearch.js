export const useDriveSearch = (driveList, searchValue) => {
  const returnList = [];
  if (searchValue === "") {
    return driveList;
  } else {
    driveList.map((drive) => {
      if (drive.driveNumber.toString().indexOf(searchValue) > -1) {
        returnList.push(drive);
      } else if (
        drive.currentProject &&
        drive.currentProject.toLowerCase().indexOf(searchValue) > -1
      ) {
        returnList.push(drive);
      }
    });
  }
  return returnList;
};
