import React from "react";

import { makeStyles } from "@material-ui/core";

import { FlexWrapper } from "../../styled/containers";
import { DriveInfo } from "./DriveInfo";

import { useDrivesSort } from "../../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
}));

export const DriveInfoHeading = ({ drives }) => {
  const { twoFifty, fiveHundred, oneTb, twoTb } = useDrivesSort(drives);
  const classes = useStyles();
  return (
    <FlexWrapper
      className={classes.root}
      justifyContent="space-around"
      padding="19px 100px 64px 100px"
    >
      <DriveInfo capacity="250GB" quantity={twoFifty} />
      <DriveInfo capacity="500GB" quantity={fiveHundred} />
      <DriveInfo capacity="1TB" quantity={oneTb} />
      <DriveInfo capacity="2TB" quantity={twoTb} />
    </FlexWrapper>
  );
};
