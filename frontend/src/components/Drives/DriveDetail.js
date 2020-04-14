import React from "react";
import { Link } from "react-router-dom";
import { PageHeading, PageSubheading, TextLink } from "../../styled/typography";
import { FlexWrapper } from "../../styled/containers";

export const DriveDetail = () => {
  return (
    <>
      <PageHeading>Drive 10</PageHeading>
      <PageSubheading>2TB</PageSubheading>
      <FlexWrapper padding="20px 20px 30px 20px">
        <TextLink className="hover" as={Link} to="#" fontSize="18px">
          Project A
        </TextLink>
      </FlexWrapper>
    </>
  );
};
