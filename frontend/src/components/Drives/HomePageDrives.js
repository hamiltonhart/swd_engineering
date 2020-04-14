import React from "react";
import { Link } from "react-router-dom";

import { FlexWrapper } from "../../styled/containers";
import { SectionHeading } from "../../styled/typography";

import { NewDriveModal } from "./NewDriveModal";
import { DriveInfo } from "./DriveInfo";

export const HomePageDrives = ({ drives }) => {
  return (
    <>
      <FlexWrapper justifyContent="space-between" padding="19px 34px">
        <SectionHeading hover as={Link} to="/drives/">
          Available Drives
        </SectionHeading>
        <NewDriveModal homeButton />
      </FlexWrapper>
      <FlexWrapper
        justifyContent="space-around"
        padding="19px 100px 113px 100px"
      >
        <DriveInfo capacity="250GB" quantity={drives.twoFiftyAvailable} />
        <DriveInfo capacity="500GB" quantity={drives.fiveHundredAvailable} />
        <DriveInfo capacity="1TB" quantity={drives.oneTbAvailable} />
        <DriveInfo capacity="2TB" quantity={drives.twoTbAvailable} />
      </FlexWrapper>
    </>
  );
};
