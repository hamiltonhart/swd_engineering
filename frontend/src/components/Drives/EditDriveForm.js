import React, { useState } from "react";
import { InputWrapper, FlexWrapper } from "../../styled/containers";
import { Input, Label, Select, Required } from "../../styled/forms";

import { Button, ClickAwayListener } from "@material-ui/core";

import { useMutation } from "@apollo/react-hooks";
import {
  UPDATE_DRIVE,
  DELETE_DRIVE,
  RELEASE_DRIVE,
  HOME_PAGE_QUERY,
  ALL_DRIVES_QUERY
} from "../../gql";

export const EditDriveForm = ({ toggle, driveId, drive }) => {
  const [updateDrive, { error: updateError }] = useMutation(UPDATE_DRIVE);
  const [deleteDrive, { error: deleteError }] = useMutation(DELETE_DRIVE);
  const [releaseDrive, { error: releaseError }] = useMutation(RELEASE_DRIVE);

  const [driveNumber, setDriveNumber] = useState(`${drive.driveNumber}`);
  const [driveCapacityGb, setDriveCapacityGb] = useState(drive.driveCapacityGb);
  const [releaseActive, setReleaseActive] = useState(false);
  const [deleteActive, setDeleteActive] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    updateDrive({
      variables: {
        id: driveId,
        driveNumber,
        driveCapacityGb
      },
      onCompleted: editDriveCompleted()
    });
  };

  const handleDelete = e => {
    e.preventDefault();
    deleteDrive({
      variables: { driveId },
      refetchQueries: [{ query: ALL_DRIVES_QUERY }, { query: HOME_PAGE_QUERY }],
      onCompleted: deleteDriveCompleted()
    });
  };

  const handleRelease = e => {
    e.preventDefault();
    console.log(`Release Drive: ${driveId}`);
    releaseDrive({
      variables: { driveId },
      refetchQueries: [{ query: ALL_DRIVES_QUERY }, { query: HOME_PAGE_QUERY }],
      onCompleted: releaseDriveCompleted()
    });
  };

  const editDriveCompleted = () => {
    toggle();
  };

  const deleteDriveCompleted = () => {
    toggle();
  };

  const releaseDriveCompleted = () => {
    toggle();
  };

  return (
    <>
      <FlexWrapper
        as="form"
        minWidth="350px"
        maxWidth="350px"
        justifyContent="space-evenly"
        margin="0 0 0 0 "
        padding="30px 20px 20px 30px"
        rowGap="30px"
        onSubmit={e => handleSubmit(e)}
      >
        <InputWrapper gridColumn="4/6" maxWidth="100px">
          <Label>
            Number <Required>*</Required>
          </Label>
          <Input
            placeholder="1"
            value={driveNumber}
            onChange={e => setDriveNumber(e.target.value)}
          />
        </InputWrapper>

        <InputWrapper gridColumn="6/8" maxWidth="100px">
          <Label>
            Capacity <Required>*</Required>
          </Label>
          <Select
            defaultValue={driveCapacityGb}
            padding="16px 18px"
            onChange={e => setDriveCapacityGb(e.target.value)}
          >
            <option value="250GB">250GB</option>
            <option value="500GB">500GB</option>
            <option value="1TB">1TB</option>
            <option value="2TB">2TB</option>
          </Select>
        </InputWrapper>

        <InputWrapper gridColumn="4 / 10" width="100%">
          <Button
            type="submit"
            size="large"
            fullWidth
            variant="contained"
            color="primary"
            disabled={
              !driveNumber.trim() ||
              !driveCapacityGb ||
              releaseActive ||
              deleteActive
            }
          >
            {`Edit Drive ${drive.driveNumber}`}
          </Button>
        </InputWrapper>
        {deleteActive ? (
          <ClickAwayListener onClickAway={() => setDeleteActive(false)}>
            <Button
              color="primary"
              variant="contained"
              onClick={e => handleDelete(e)}
            >
              Delete Drive
            </Button>
          </ClickAwayListener>
        ) : (
          <Button
            color="primary"
            disabled={releaseActive}
            variant="outlined"
            onClick={e => setDeleteActive(true)}
          >
            Delete Drive
          </Button>
        )}
        {drive.rentalProjects.length > 0 && (
          <ReleaseDriveButtons
            releaseActive={releaseActive}
            setReleaseActive={setReleaseActive}
            deleteActive={deleteActive}
            handleRelease={handleRelease}
          />
        )}
      </FlexWrapper>
    </>
  );
};

const ReleaseDriveButtons = ({
  releaseActive,
  setReleaseActive,
  deleteActive,
  handleRelease
}) =>
  releaseActive ? (
    <ClickAwayListener onClickAway={() => setReleaseActive(false)}>
      <Button
        color="primary"
        variant="contained"
        onClick={e => handleRelease(e)}
      >
        Release Drive
      </Button>
    </ClickAwayListener>
  ) : (
    <Button
      color="primary"
      variant="outlined"
      disabled={deleteActive}
      onClick={e => setReleaseActive(true)}
    >
      Release Drive
    </Button>
  );
