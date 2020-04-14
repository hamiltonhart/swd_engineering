import React, { useState } from "react";
import { InputWrapper, FlexWrapper } from "../../styled/containers";
import { Input, Label, Select, Required } from "../../styled/forms";

import { Button } from "@material-ui/core";

import { useMutation } from "@apollo/react-hooks";
import { CREATE_DRIVE, ALL_DRIVES_QUERY, HOME_PAGE_QUERY } from "../../gql";

export const NewDriveForm = ({ toggle, nextDriveNumber }) => {
  const [createDrive, { error: createError }] = useMutation(CREATE_DRIVE);

  const [driveNumber, setDriveNumber] = useState(`${nextDriveNumber}`);
  const [driveCapacityGb, setDriveCapacityGb] = useState("2TB");
  const [numberOfDrives, setNumberOfDrives] = useState("1");

  const handleSubmit = e => {
    e.preventDefault();
    createDrive({
      variables: {
        driveNumber,
        driveCapacityGb,
        numberOfDrives
      },
      refetchQueries: [{ query: ALL_DRIVES_QUERY }, { query: HOME_PAGE_QUERY }],
      onCompleted: createDriveCompleted()
    });
  };

  const createDriveCompleted = () => {
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

        <InputWrapper gridColumn="8/10" maxWidth="100px">
          <Label>
            Quantity <Required>*</Required>
          </Label>
          <Input
            placeholder="1"
            value={numberOfDrives}
            onChange={e => setNumberOfDrives(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper gridColumn="4 / 10" width="100%">
          <Button
            type="submit"
            size="large"
            fullWidth
            variant="contained"
            color="primary"
            disabled={
              !driveNumber.trim() || !driveCapacityGb | !numberOfDrives.trim()
            }
          >
            Create Drives
          </Button>
        </InputWrapper>
      </FlexWrapper>
    </>
  );
};
