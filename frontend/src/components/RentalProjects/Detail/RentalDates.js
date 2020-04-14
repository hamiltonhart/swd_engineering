import React from "react";

import { SectionHeading, Typography } from "../../../styled/typography";
import { darkGrey } from "../../../styled/defaults";
import {
  SimpleDiv,
  GridWrapper,
  FlexWrapper
} from "../../../styled/containers";
import { WhiteButton } from "../../../styled/buttons";

export const RentalDates = ({
  startDate,
  mixingCompleteDate,
  projectCompleteDate
}) => {
  return (
    <SimpleDiv margin="27px auto 27px auto" width="85%">
      <SectionHeading>Dates</SectionHeading>
      <GridWrapper
        columns="50% 50%"
        gridRows="auto-fit auto-fit"
        margin="10px 0 10px 0"
        columnGap="20px"
      >
        <FlexWrapper
          flexDirection="column"
          alignItems="start"
          gridColumn="1 / 2"
          justifySelf="start"
          margin="0 0 0 12%"
        >
          <Typography margin="4px 0 4px 0" fontSize="18px" fontColor={darkGrey}>
            Start Date
          </Typography>
          <Typography margin="4px 0 4px 0" fontSize="18px" fontColor={darkGrey}>
            Completed
          </Typography>
          <Typography margin="4px 0 4px 0" fontSize="18px" fontColor={darkGrey}>
            Erased
          </Typography>
        </FlexWrapper>
        <SimpleDiv gridColumn="2 / 2" justifySelf="start" margin="0 12% 0 0">
          <Typography margin="4px 0 4px 0" fontSize="18px">
            {startDate
              ? `${startDate.slice(5, 7)} / ${startDate.slice(
                  8,
                  10
                )} / ${startDate.slice(0, 4)}`
              : "---"}
          </Typography>
          <Typography margin="4px 0 4px 0" fontSize="18px">
            {mixingCompleteDate
              ? `${mixingCompleteDate.slice(5, 7)} / ${mixingCompleteDate.slice(
                  8,
                  10
                )} / ${mixingCompleteDate.slice(0, 4)}`
              : "---"}
          </Typography>
          <Typography margin="4px 0 4px 0" fontSize="18px">
            {projectCompleteDate
              ? `${projectCompleteDate.slice(
                  5,
                  7
                )} / ${projectCompleteDate.slice(
                  8,
                  10
                )} / ${projectCompleteDate.slice(0, 4)}`
              : "---"}
          </Typography>
        </SimpleDiv>
        <FlexWrapper
          gridColumn="1/3"
          justifyContent="space-between"
          width="75%"
          margin="20px 0 0 0 "
        >
          <WhiteButton small borderThin minWidth="135px">
            Complete
          </WhiteButton>
          <WhiteButton small borderThin minWidth="135px">
            Erase
          </WhiteButton>
        </FlexWrapper>
      </GridWrapper>
    </SimpleDiv>
  );
};
