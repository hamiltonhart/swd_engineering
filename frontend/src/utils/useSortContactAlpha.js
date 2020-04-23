export const useSortContactAlpha = (inputList, sortBy, ascending = true) => {
  if (ascending && sortBy === "0") {
    const sortedList = inputList.sort(function (a, b) {
      if (a.firstName < b.firstName) {
        return -1;
      }
      if (a.firstName > b.firstName) {
        return 1;
      }
      return 0;
    });
    return sortedList;
  }

  if (!ascending && sortBy === "0") {
    const sortedList = inputList.sort(function (a, b) {
      if (a.firstName > b.firstName) {
        return -1;
      }
      if (a.firstName < b.firstName) {
        return 1;
      }
      return 0;
    });
    return sortedList;
  }

  if (ascending && sortBy === "1") {
    const sortedList = inputList.sort(function (a, b) {
      if (a.lastName < b.lastName) {
        return -1;
      }
      if (a.lastName > b.lastName) {
        return 1;
      }
      return 0;
    });
    return sortedList;
  }

  if (!ascending && sortBy === "1") {
    const sortedList = inputList.sort(function (a, b) {
      if (a.lastName > b.lastName) {
        return -1;
      }
      if (a.lastName < b.lastName) {
        return 1;
      }
      return 0;
    });
    return sortedList;
  }
};
