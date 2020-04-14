import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  FlexWrapper,
  SimpleDiv,
  PositionWrapper
} from "../../styled/containers";
import { CardHeading, CardSubheading, TextLink } from "../../styled/typography";
import { Dot } from "../../styled/utilities";

export const RentalCard = ({ rental }) => {
  const handleLinkClick = e => {
    e.stopPropagation();
  };
  return (
    <Card
      as={Link}
      to={{ pathname: `/rentals/${rental.id}`, state: { rentalId: rental.id } }}
      margin="12px 0 0 0 "
    >
      <CardHeading>
        {rental.season
          ? `${rental.title} - S${rental.season}`
          : `${rental.title}`}
      </CardHeading>
      <FlexWrapper justifyContent="left" padding="0">
        <Dot color="0" />
        <CardSubheading>{rental.abbreviation}</CardSubheading>
      </FlexWrapper>
      <SimpleDiv padding="8px 0 0 0 " className="handle-link">
        <p>
          Room: {(rental.primaryRoom && rental.primaryRoom.room.name) || "---"}
        </p>
        <p>Drives: {rental.totalDrives || "---"}</p>
        <p>Config: {rental.channelConfig || "---"}</p>
        <PositionWrapper position="absolute" bottom="15px" right="20px">
          <TextLink
            href={rental.filesLink}
            target="_blank"
            fontSize="16px"
            onClick={e => handleLinkClick(e)}
          >
            GoogleDrive
          </TextLink>
        </PositionWrapper>
      </SimpleDiv>
    </Card>
  );
};
