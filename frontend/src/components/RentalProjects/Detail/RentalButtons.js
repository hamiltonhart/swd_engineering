import React from "react";

import { MediaShuttleModal, RoomDetailsModal } from "./ButtonModals";

import { FlexWrapper } from "../../../styled/containers";
import { BlackButton, InactiveButton } from "../../../styled/buttons";

export const RentalButtons = ({ primaryRoomId, projectId, filesLink }) => {
  return (
    <FlexWrapper flexDirection="column">
      {primaryRoomId ? (
        <MediaShuttleModal primaryRoomId={primaryRoomId} />
      ) : (
        <InactiveButton minWidth="75%" margin="10px 0" inactive>
          Media Shuttle Details
        </InactiveButton>
      )}
      <RoomDetailsModal projectId={projectId} />
      <BlackButton
        as="a"
        href={filesLink}
        target="_blank"
        minWidth="75%"
        margin="10px 0"
      >
        GoogleDrive
      </BlackButton>
    </FlexWrapper>
  );
};
