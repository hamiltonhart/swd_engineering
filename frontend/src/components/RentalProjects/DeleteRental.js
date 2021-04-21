import React from "react";

import { Button } from "@material-ui/core";

import { useMutation } from "@apollo/react-hooks";
import { DELETE_RENTAL, HOME_PAGE_QUERY, GET_RENTALS_QUERY } from "../gql";

const [deleteRentalProject, { error: deleteError }] = useMutation(
  DELETE_RENTAL
);

const handleDelete = (e) => {
  e.preventDefault();
  deleteRentalProject({
    variables: { projectId: rentalId },
    refetchQueries: [
      { query: HOME_PAGE_QUERY, variables: { limit: 8, reverse: true } },
      { query: GET_RENTALS_QUERY },
    ],
    onCompleted: deleteCompleted(),
  });
};

const deleteCompleted = ({ setDeleted, deleted }) => {
  setDeleted(!deleted);
};

export const DeleteRental = () => {
  return (
    <>
      <Button color="secondary" variant="text" onClick={(e) => handleDelete(e)}>
        Delete
      </Button>
      {deleteError && <Error error={deleteError} />}
    </>
  );
};
