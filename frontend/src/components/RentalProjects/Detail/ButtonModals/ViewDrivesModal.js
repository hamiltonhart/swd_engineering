import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "../../../../utils";

import { Modal, ModalArea, ModalCloseIcon } from "../../../utilities";
import {
  PageHeading,
  Typography,
  TextLink
} from "../../../../styled/typography";
import {
  GridWrapper,
  InputWrapper,
  FlexWrapper
} from "../../../../styled/containers";
import { Select, Label } from "../../../../styled/forms";
import { RedButton, BlackButton } from "../../../../styled/buttons";
import { darkGrey } from "../../../../styled/defaults";

export const ViewDrivesModal = ({ totalDrives, totalStorage, drives }) => {
  const [notes, setNotes] = useState("");

  const { isShowing, toggle } = useModal();

  return (
    <>
      <BlackButton small onClick={() => toggle()}>
        View Drives
      </BlackButton>

      <Modal isShowing={isShowing} toggle={toggle}>
        <ModalArea>
          <ModalCloseIcon toggle={toggle} />

          <PageHeading>Drives</PageHeading>
          <FlexWrapper padding="20px 0 0 0" justifyContent="space-evenly">
            <Typography fontSize="18px" fontWeight="700">
              {`${totalDrives} Drives`}
            </Typography>
            <Typography fontSize="18px" fontWeight="700">
              {`${totalStorage}`}
            </Typography>
          </FlexWrapper>
          <GridWrapper
            as="form"
            minWidth="508px"
            maxWidth="508px"
            margin="20px 0 0 0 "
            gridGap="0"
          >
            <InputWrapper gridColumn="4 / 10">
              <Label>Drive</Label>
              <Select placeholder="Select Drive" defaultOption="---">
                <option value="---">---</option>
                <option>Drive A</option>
              </Select>
            </InputWrapper>
            <InputWrapper gridColumn="4 / 10">
              <RedButton small minWidth="100%">
                Add / Edit
              </RedButton>
            </InputWrapper>
          </GridWrapper>
          <GridWrapper minWidth="508px" maxWidth="508px" margin="20px 0 0 0 ">
            {drives.map(drive => (
              <FlexWrapper key={drive.id} padding=" 0 10px" gridColumn="span 3">
                <TextLink
                  as={Link}
                  className="hover"
                  fontSize="18px"
                  margin="0 10px 0 0"
                >
                  {drive.drive.driveNumber}
                </TextLink>
                <Typography fontColor={darkGrey}>
                  {drive.drive.driveCapacityGb}
                </Typography>
              </FlexWrapper>
            ))}
          </GridWrapper>
        </ModalArea>
      </Modal>
    </>
  );
};
