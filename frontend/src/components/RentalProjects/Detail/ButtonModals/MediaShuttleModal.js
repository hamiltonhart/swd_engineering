import React, { useState } from "react";
import { useModal } from "../../../../utils";
import { Modal, ModalArea, ModalCloseIcon } from "../../../utilities";

import { GET_PRIMARY_ROOM_QUERY } from "../../../../gql";
import { useQuery } from "react-apollo";

import {
  PageHeading,
  Typography,
  TextLink
} from "../../../../styled/typography";
import { darkGrey } from "../../../../styled/defaults";
import {
  GridWrapper,
  FlexWrapper,
  InputWrapper
} from "../../../../styled/containers";
import {
  BlackButton,
  RedButton,
  WhiteButton
} from "../../../../styled/buttons";
import { Select, Label, Input } from "../../../../styled/forms";

export const MediaShuttleModal = ({ primaryRoomId }) => {
  const [ip, setIp] = useState("");
  const { isShowing, toggle } = useModal();

  const { loading, error, data } = useQuery(GET_PRIMARY_ROOM_QUERY, {
    variables: { id: primaryRoomId }
  });

  const buttonClick = (e, toggle) => {
    e.stopPropagation();
    toggle();
  };

  return (
    <>
      <>
        <BlackButton
          minWidth="75%"
          margin="10px 0"
          onClick={e => buttonClick(e, toggle)}
        >
          Media Shuttle Details
        </BlackButton>
        <Modal isShowing={isShowing}>
          <ModalArea>
            <ModalCloseIcon toggle={toggle} />

            {loading && <h1>Loading...</h1>}
            {error && <h1>Error: {error.message}</h1>}
            {data && (
              <>
                {isShowing && (
                  <>
                    <PageHeading>{`${data.primaryRoom.room.name} Media Shuttle`}</PageHeading>
                    <FlexWrapper margin="0" padding="0">
                      <Typography fontSize="18px" fontWeight="700">
                        smb://10.254.129.251
                      </Typography>
                    </FlexWrapper>
                    <GridWrapper padding="30px 20px" columns="1fr 1fr 1fr">
                      <FlexWrapper padding="0 10px" flexDirection="column">
                        <Typography fontColor={darkGrey} fontSize="16px">
                          IP Range
                        </Typography>
                        <Typography fontSize="16px">
                          {data.primaryRoom.room.mediaShuttleIpRange}
                        </Typography>
                      </FlexWrapper>
                      <FlexWrapper padding="0 10px" flexDirection="column">
                        <Typography fontColor={darkGrey} fontSize="16px">
                          Subnet
                        </Typography>
                        <Typography fontSize="16px">
                          {data.primaryRoom.room.mediaShuttleSubnet}
                        </Typography>
                      </FlexWrapper>
                      <FlexWrapper padding="0 10px" flexDirection="column">
                        <Typography fontColor={darkGrey} fontSize="16px">
                          Router
                        </Typography>
                        <Typography fontSize="16px">
                          {data.primaryRoom.room.mediaShuttleHost}
                        </Typography>
                      </FlexWrapper>
                    </GridWrapper>
                    <GridWrapper
                      as="form"
                      maxWidth="570px"
                      columns="repeat(6, 1fr)"
                    >
                      <InputWrapper gridColumn="2 / 5">
                        <Label>Client</Label>
                        <Select>
                          <option value="---">---</option>
                          <option value="Andrew Law">Andrew Law</option>
                        </Select>
                      </InputWrapper>
                      <InputWrapper gridColumn=" 5/ 6">
                        <Label>IP</Label>
                        <Input
                          value={ip}
                          onChange={e => setIp(e.target.value)}
                        />
                      </InputWrapper>
                      <FlexWrapper
                        gridColumn="span 7"
                        justifyContent="space-evenly"
                      >
                        <WhiteButton small borderThin margin="0 10px">
                          Remove
                        </WhiteButton>
                        <RedButton small margin="0 10px">
                          Add / Edit
                        </RedButton>
                      </FlexWrapper>
                    </GridWrapper>
                    <GridWrapper columns="repeat(2, 1fr)" margin="30px 0 0 0">
                      {data.primaryRoom.msClients &&
                        data.primaryRoom.msClients.map((client, index) => (
                          <TextLink
                            key={client.id}
                            gridColumn="1"
                            gridRow={index + 1}
                            fontSize="18px"
                            className="hover"
                            justifySelf="end"
                            margin="0"
                            padding="0"
                          >
                            {`${client.projectClient.client.firstName} ${client.projectClient.client.lastName}`}
                          </TextLink>
                        ))}

                      {data.primaryRoom.msClients &&
                        data.primaryRoom.msClients.map((client, index) => (
                          <Typography
                            key={`${client.id}-${client.projectClient.id}`}
                            gridColumn="2"
                            gridRow={index + 1}
                            fontSize="18px"
                            fontColor={darkGrey}
                            justifySelf="start"
                          >
                            {client.clientMs}
                          </Typography>
                        ))}
                    </GridWrapper>
                  </>
                )}
              </>
            )}
          </ModalArea>
        </Modal>
      </>
    </>
  );
};
