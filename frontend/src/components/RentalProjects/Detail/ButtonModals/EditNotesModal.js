import React, { useState } from "react";
import { useModal } from "../../../../utils";

import { useMutation } from "@apollo/react-hooks";
import { EDIT_RENTAL_NOTES } from "../../../../gql";

import { Modal, ModalArea, ModalCloseIcon } from "../../../utilities";
import { PageHeading } from "../../../../styled/typography";
import { GridWrapper, InputWrapper } from "../../../../styled/containers";
import { Error } from "../../../global";

import { Button, TextField } from "@material-ui/core";

export const EditNotesModal = ({ currentNotes, projectId }) => {
  const [notes, setNotes] = useState(currentNotes);

  const { isShowing, toggle } = useModal();

  const [updateRentalProject, { error }] = useMutation(EDIT_RENTAL_NOTES);

  const handleSubmit = e => {
    e.preventDefault();
    updateRentalProject({
      variables: { id: projectId, notes },
      onCompleted: updateComplete()
    });
  };

  const updateComplete = () => {
    toggle();
  };

  return (
    <>
      <Button
        size="small"
        color="secondary"
        variant="contained"
        onClick={() => toggle()}
      >
        Edit Notes
      </Button>

      <Modal isShowing={isShowing}>
        <ModalArea>
          <ModalCloseIcon toggle={toggle} />

          <PageHeading>Edit Notes</PageHeading>
          <GridWrapper
            as="form"
            minWidth="622px;"
            maxWidth="622px;"
            margin="20px 0 0 0 "
            onSubmit={e => handleSubmit(e)}
          >
            <InputWrapper gridColumn="span 12">
              <TextField
                variant="outlined"
                fullWidth
                multiline
                rows="20"
                value={notes}
                onChange={e => setNotes(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper gridColumn="4 / 10">
              <Button
                type="submit"
                size="large"
                color="primary"
                variant="contained"
                fullWidth
              >{`Submit`}</Button>
            </InputWrapper>
          </GridWrapper>
          {error && <Error error={error} />}
        </ModalArea>
      </Modal>
    </>
  );
};
