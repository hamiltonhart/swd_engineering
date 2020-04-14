import React, { useState, useEffect } from "react";
import { Redirect, Link, useLocation } from "react-router-dom";

import {
  RentalBasicInfo,
  RentalClients,
  RentalNotes,
  RentalButtons,
  RentalDates,
  RentalDrives
} from "../components/RentalProjects/Detail";
import { Error } from "../components/global";

import { Button } from "@material-ui/core";

import {
  MainWrapper,
  PageHeadingWrapper,
  GridWrapper,
  SimpleDiv
} from "../styled/containers";
import { PageHeading, PageSubheading } from "../styled/typography";

import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  GET_RENTAL_QUERY,
  DELETE_RENTAL,
  HOME_PAGE_QUERY,
  GET_RENTALS_QUERY
} from "../gql";

const RentalDetailPage = props => {
  const location = useLocation();
  // const [rentalId, setRentalId] = useState(
  //   (props.location.state && props.location.state.rentalId) ||
  //     window.location.pathname.slice(9)
  // );
  const [rentalId, setRentalId] = useState(location.pathname.slice(9));
  const [deleted, setDeleted] = useState(false);

  const { data, loading, error } = useQuery(GET_RENTAL_QUERY, {
    variables: {
      id: rentalId
    }
  });

  const [deleteRentalProject, { error: deleteError }] = useMutation(
    DELETE_RENTAL
  );

  const handleDelete = e => {
    e.preventDefault();
    deleteRentalProject({
      variables: { projectId: rentalId },
      refetchQueries: [
        { query: HOME_PAGE_QUERY, variables: { limit: 8, reverse: true } },
        { query: GET_RENTALS_QUERY }
      ],
      onCompleted: deleteCompleted()
    });
  };

  const deleteCompleted = () => {
    setDeleted(!deleted);
  };

  useEffect(() => {
    if (location.pathname.slice(9) !== rentalId) {
      setRentalId(location.pathname.slice(9));
    }
  });

  return (
    <MainWrapper>
      {deleted && <Redirect to="/rentals" />}
      {loading && <h1>Loading</h1>}
      {error && <Error error={error} />}
      {data && (
        <>
          <PageHeadingWrapper>
            <PageHeading>{data.rentalProject.title}</PageHeading>
            {data.rentalProject.season && (
              <PageSubheading>
                Season {data.rentalProject.season}
              </PageSubheading>
            )}
          </PageHeadingWrapper>
          <GridWrapper columns="65% 35%" columnGap="30px">
            <SimpleDiv className="hacky-width" minWidth="100%">
              <RentalBasicInfo
                project={data.rentalProject}
                abbreviation={data.rentalProject.abbreviation}
                room={data.rentalProject.primaryRoom}
                config={data.rentalProject.channelConfig}
                driveUser={data.rentalProject.driveUser}
                drivePass={data.rentalProject.drivePass}
                msUser={data.rentalProject.msUser}
                msPass={data.rentalProject.msPass}
              />
              <RentalClients
                clients={data.rentalProject.rentalClients}
                setRentalId={setRentalId}
              />
              <RentalNotes
                notes={data.rentalProject.additionalInfo}
                projectId={data.rentalProject.id}
              />
            </SimpleDiv>
            <SimpleDiv gridColumn="2/3" alignSelf="start" width="100%">
              <RentalButtons
                primaryRoomId={
                  data.rentalProject.primaryRoom &&
                  data.rentalProject.primaryRoom.id
                }
                projectId={data.rentalProject.id}
                filesLink={data.rentalProject.filesLink}
              />
              <RentalDates
                startDate={data.rentalProject.startDate}
                mixingCompleteDate={data.rentalProject.mixingCompleteDate}
                projectCompleteDate={data.rentalProject.projectCompleteDate}
              />
              <RentalDrives
                totalDrives={data.rentalProject.totalDrives}
                totalStorage={data.rentalProject.totalStorage}
                drives={data.rentalProject.rentalDrives}
              />
            </SimpleDiv>
            <Button
              color="secondary"
              variant="outlined"
              onClick={e => handleDelete(e)}
            >
              Delete
            </Button>
            {deleteError && <Error error={deleteError} />}
          </GridWrapper>
        </>
      )}
    </MainWrapper>
  );
};

export default RentalDetailPage;
