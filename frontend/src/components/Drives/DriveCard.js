import React from "react";
import { useModal } from "../../utils/";
import { Link } from "react-router-dom";
import { Card, SimpleDiv, PositionWrapper } from "../../styled/containers";
import { BlackButton } from "../../styled/buttons";
import { CardHeading, TextLink } from "../../styled/typography";
import { EditDriveModal } from "./EditDriveModal";

export const DriveCard = ({ drive }) => {
  const { isShowing, toggle } = useModal();

  return (
    <>
      <Card margin="12px 0 0 0 " className="hover__control">
        <CardHeading>Drive {drive.driveNumber}</CardHeading>
        <SimpleDiv className="body__nohide" padding="8px 20px">
          <p>Capacity: {drive.driveCapacityGb}</p>
          {drive.rentalProjects[0] && (
            <TextLink
              as={Link}
              to={{
                pathname: `/rentals/${drive.rentalProjects[0].project.id}`,
                state: { rentalId: drive.rentalProjects[0].project.id }
              }}
              onClick={e => e.stopPropagation()}
            >
              {drive.rentalProjects[0].project.season
                ? `${drive.rentalProjects[0].project.title} -S${drive.rentalProjects[0].project.season}`
                : `${drive.rentalProjects[0].project.title}`}
            </TextLink>
          )}
        </SimpleDiv>
        <PositionWrapper
          className="hover__show"
          position="absolute"
          bottom="10%"
          right="10%"
        >
          <BlackButton small onClick={() => toggle()}>
            Edit
          </BlackButton>
        </PositionWrapper>
      </Card>
      {isShowing && (
        <EditDriveModal
          driveId={drive.id}
          drive={drive}
          isShowing={isShowing}
          toggle={toggle}
        />
      )}
    </>
  );
};
