import React from "react";
import { useModal } from "../../../../utils";
import { Modal, ModalArea, ModalCloseIcon } from "../../../utilities";

import { useQuery } from "@apollo/react-hooks";
import { GET_ROOMS_QUERY } from "../../../../gql";

import { PageHeading, Typography } from "../../../../styled/typography";
import {
  SimpleDiv,
  GridWrapper,
  InputWrapper
} from "../../../../styled/containers";
import {
  BlackButton,
  RedButton,
  WhiteButton
} from "../../../../styled/buttons";
import { Select, Label, Input } from "../../../../styled/forms";

export const RoomDetailsModal = ({ projectId }) => {
  const { isShowing, toggle } = useModal();

  const { data, loading, error } = useQuery(GET_ROOMS_QUERY, {
    variables: { id: projectId }
  });

  const buttonClick = (e, toggle) => {
    e.stopPropagation();
    toggle();
  };

  return (
    <>
      {loading && <h1>Loading</h1>}
      {error && <h1>Error</h1>}
      {data && (
        <>
          <BlackButton
            minWidth="75%"
            margin="10px 0"
            onClick={e => buttonClick(e, toggle)}
          >
            Room Details
          </BlackButton>
          <Modal isShowing={isShowing} toggle={toggle}>
            <ModalArea>
              <ModalCloseIcon toggle={toggle} />

              <PageHeading>Show Rooms</PageHeading>
              <GridWrapper
                as="form"
                maxWidth="570px"
                columns="1fr 1fr 1fr 1fr"
                margin="20px 0 0 0"
              >
                <InputWrapper gridColumn="1 / 4">
                  <Label>Room</Label>
                  <Select>
                    <option value="---">---</option>
                    <option value="Stage2">Stage 2</option>
                  </Select>
                </InputWrapper>
                <InputWrapper>
                  <Label>Primary</Label>
                  <Input type="checkbox" width="30px" height="30px" />
                </InputWrapper>
                <SimpleDiv gridColumn="span 2">
                  <WhiteButton small borderThin>
                    Remove Room
                  </WhiteButton>
                </SimpleDiv>
                <SimpleDiv gridColumn="span 2">
                  <RedButton small>Add / Edit Room</RedButton>
                </SimpleDiv>
              </GridWrapper>
              <GridWrapper columns="1fr 1fr 1fr 1fr" margin="30px 0 0 0">
                {data.projectRooms &&
                  data.projectRooms.map(room =>
                    room.primaryRoom ? (
                      <Typography key={room.id} fontSize="18px" highlight>
                        {room.room.name}
                      </Typography>
                    ) : (
                      <Typography fontSize="18px">{room.room.name}</Typography>
                    )
                  )}
              </GridWrapper>
            </ModalArea>
          </Modal>
        </>
      )}
    </>
  );
};
