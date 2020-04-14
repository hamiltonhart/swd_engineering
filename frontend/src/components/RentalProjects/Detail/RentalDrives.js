import React from "react";

import { SectionHeading, Typography } from "../../../styled/typography";
import { darkGrey } from "../../../styled/defaults";
import {
  SimpleDiv,
  FlexWrapper,
  InputWrapper
} from "../../../styled/containers";
import { Select } from "../../../styled/forms";
import { WhiteButton } from "../../../styled/buttons";
import { ViewDrivesModal } from "./ButtonModals";

export const RentalDrives = ({ totalStorage, totalDrives, drives }) => {
  return (
    <SimpleDiv margin="33px auto 27px auto" width="85%">
      <SectionHeading>Drives</SectionHeading>
      <FlexWrapper
        justifyContent="space-around"
        padding="10px 10px 20px 10px"
        borderBottom={`1px solid ${darkGrey}`}
        width="85%"
        margin="0 auto 0 auto"
      >
        <Typography fontWeight="700" fontSize="18px">
          {`${totalDrives} Drives`}
        </Typography>
        <Typography fontWeight="700" fontSize="18px">
          {`${totalStorage}`}
        </Typography>
      </FlexWrapper>
      <FlexWrapper>
        <InputWrapper maxWidth="45%" margin="20px 5px 20px 5px">
          <Select placeholder="Select Drive" defaultOption="---">
            <option value="---">---</option>
            <option>Drive A</option>
          </Select>
        </InputWrapper>
        <WhiteButton borderThin padding="17px 30px" margin="20px 5px 20px 5px">
          Add Drive
        </WhiteButton>
      </FlexWrapper>
      <FlexWrapper margin="20px 0 0 0 ">
        <ViewDrivesModal
          totalStorage={totalStorage}
          totalDrives={totalDrives}
          drives={drives}
        />
      </FlexWrapper>
    </SimpleDiv>
  );
};
