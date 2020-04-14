export const useDrivesSort = filteredDrives => {
  function sortDrives(filteredDrives, sortOption) {
    switch (sortOption) {
      case "twoFifty":
        return filteredDrives.filter(
          drive => drive.driveCapacityGb === "250GB"
        );
      case "fiveHundred":
        return filteredDrives.filter(
          drive => drive.driveCapacityGb === "500GB"
        );
      case "oneTb":
        return filteredDrives.filter(drive => drive.driveCapacityGb === "1TB");
      case "twoTb":
        return filteredDrives.filter(drive => drive.driveCapacityGb === "2TB");
    }
  }

  const twoFifty = sortDrives(filteredDrives, "twoFifty");
  const fiveHundred = sortDrives(filteredDrives, "fiveHundred");
  const oneTb = sortDrives(filteredDrives, "oneTb");
  const twoTb = sortDrives(filteredDrives, "twoTb");

  return {
    twoFifty: twoFifty.length,
    fiveHundred: fiveHundred.length,
    oneTb: oneTb.length,
    twoTb: twoTb.length
  };
};
