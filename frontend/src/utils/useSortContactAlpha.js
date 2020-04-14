export const useSortContactAlpha = (inputList, ascending = true, sortBy) => {
  if (ascending && sortBy === "first-name") {
    const sortedList = inputList.sort(function(a, b) {
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

  if (!ascending && sortBy === "last-name") {
    const sortedList = inputList.sort(function(a, b) {
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

  if (ascending && sortBy === "last-name") {
    const sortedList = inputList.sort(function(a, b) {
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

  if (!ascending && sortBy === "last-name") {
    const sortedList = inputList.sort(function(a, b) {
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

// export const useSortAlpha = (inputList, ascending = true, byFirstName = true) => {
//   function firstNameAscending(a, b) {
//     if (a.firstName < b.firstName) {
//       return -1;
//     }
//     if (a.firstName > b.firstName) {
//       return 1;
//     }
//     return 0;
//   }

//   function firstNameDescending(a, b) {
//     if (a.firstName > b.firstName) {
//       return -1;
//     }
//     if (a.firstName < b.firstName) {
//       return 1;
//     }
//     return 0;
//   }

//   function listSort(inputList, ascending, byFirstName) {
//       switch (ascending, byFirstName) {

//       }
//   }

// };
