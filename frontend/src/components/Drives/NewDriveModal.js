import React from "react";
import { useModal } from "../../utils";
import { NewDriveForm } from "./NewDriveForm";

import { Modal, ModalArea, ModalCloseIcon } from "../utilities";
import { PageHeading } from "../../styled/typography";
import { PositionWrapper } from "../../styled/containers";

import { RedButton, RoundButton } from "../../styled/buttons";
import { CircularProgress } from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import { GET_LAST_DRIVE } from "../../gql";

export const NewDriveModal = ({ homeButton }) => {
  const { isShowing, toggle } = useModal();

  const { data, loading, error } = useQuery(GET_LAST_DRIVE);

  return (
    <>
      {homeButton ? (
        <RedButton small onClick={() => toggle()}>
          New Drive
        </RedButton>
      ) : (
        <PositionWrapper position="fixed" bottom="5%" right="4%">
          <RoundButton onClick={() => toggle()}>+</RoundButton>
        </PositionWrapper>
      )}
      <Modal isShowing={isShowing}>
        <ModalArea>
          <ModalCloseIcon toggle={toggle} />
          <PageHeading>Add Drives</PageHeading>
          {loading && <CircularProgress />}
          {data && (
            <NewDriveForm
              toggle={toggle}
              nextDriveNumber={data.lastDrive.driveNumber + 1}
            />
          )}
        </ModalArea>
      </Modal>
    </>
  );
};
