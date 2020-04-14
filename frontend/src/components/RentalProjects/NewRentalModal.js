import React, { useState } from "react";
import { useModal } from "../../utils";
import { Redirect } from "react-router-dom";

import { useMutation } from "@apollo/react-hooks";
import { CREATE_RENTAL, HOME_PAGE_QUERY, GET_RENTALS_QUERY } from "../../gql";

import { Modal, ModalArea, ModalCloseIcon } from "../utilities";
import { PageHeading } from "../../styled/typography";
import {
  GridWrapper,
  InputWrapper,
  PositionWrapper
} from "../../styled/containers";

import { RedButton, RoundButton } from "../../styled/buttons";

import {
  makeStyles,
  Button,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  IconButton
} from "@material-ui/core";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

const useStyles = makeStyles({
  select: {
    minWidth: "212px"
  },
  label: {
    paddingLeft: "12px"
  },
  search: {}
});

export const NewRentalModal = ({ homeButton }) => {
  const [newRentalId, setNewRentalId] = useState("");
  const [title, setTitle] = useState("");
  const [abbr, setAbbr] = useState("");
  const [googleDrive, setGoogleDrive] = useState("");
  const [season, setSeason] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [channelConfig, setChannelConfig] = useState("5.1");

  const { isShowing, toggle } = useModal();

  const [createRentalProject, { error }] = useMutation(CREATE_RENTAL);

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await createRentalProject({
      variables: {
        title,
        abbreviation: abbr,
        filesLink: googleDrive,
        channelConfig,
        season,
        startDate
      },
      refetchQueries: [
        { query: GET_RENTALS_QUERY },
        { query: HOME_PAGE_QUERY, variables: { limit: 8, reverse: true } }
      ]
    });
    if (res.data.createRentalProject.project) {
      setNewRentalId(res.data.createRentalProject.project.id);
    }
  };

  const handleToggle = () => {
    setTitle("");
    setAbbr("");
    setGoogleDrive("");
    setSeason(null);
    setStartDate(null);
    setChannelConfig("5.1");
    setGoogleDrive("");
    toggle();
  };

  const classes = useStyles();

  return (
    <>
      {newRentalId && <Redirect push to={`/rentals/${newRentalId}`} />}
      {homeButton ? (
        <RedButton small onClick={() => toggle()}>
          New Rental
        </RedButton>
      ) : (
        <PositionWrapper position="fixed" bottom="5%" right="4%">
          <RoundButton onClick={() => toggle()}>+</RoundButton>
        </PositionWrapper>
      )}
      <Modal isShowing={isShowing}>
        <ModalArea>
          <ModalCloseIcon toggle={handleToggle} />

          <PageHeading>New Rental</PageHeading>
          <GridWrapper
            as="form"
            minWidth="622px;"
            maxWidth="622px;"
            margin="20px 0 0 0 "
            onSubmit={e => handleSubmit(e)}
          >
            <InputWrapper gridColumn="span 6">
              <InputLabel className={classes.label}>Title</InputLabel>
              <OutlinedInput
                placeholder="Star Wars"
                fullWidth
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </InputWrapper>

            <InputWrapper gridColumn="span 2">
              <InputLabel className={classes.label}>Season</InputLabel>
              <OutlinedInput
                placeholder="1"
                value={season}
                onChange={e => setSeason(e.target.value)}
              />
            </InputWrapper>

            <InputWrapper gridColumn="span 4">
              <InputLabel className={classes.label}>Abbreviation</InputLabel>
              <OutlinedInput
                placeholder="starwars "
                value={abbr}
                onChange={e => setAbbr(e.target.value)}
              />
            </InputWrapper>

            <InputWrapper gridColumn="span 3">
              <InputLabel className={classes.label}>Config</InputLabel>
              <Select
                color="primary"
                variant="outlined"
                fullWidth
                defaultValue={channelConfig}
                onChange={e => setChannelConfig(e.target.value)}
              >
                <MenuItem value="ST">Stereo</MenuItem>
                <MenuItem value="5.1">5.1</MenuItem>
                <MenuItem value="7.1">7.1</MenuItem>
                <MenuItem value="ATMOS">ATMOS</MenuItem>
                <MenuItem value="DTS">DTS</MenuItem>
                <MenuItem value="IMAX6">IMAX 6</MenuItem>
                <MenuItem value="IMAX12">IMAX 12</MenuItem>
              </Select>
            </InputWrapper>

            <InputWrapper gridColumn="span 4">
              <InputLabel className={classes.label}>Start Date</InputLabel>
              <OutlinedInput
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
              />
            </InputWrapper>

            <InputWrapper gridColumn="span 12">
              <InputLabel className={classes.label}>GoogleDrive</InputLabel>
              <OutlinedInput
                placeholder="http://drive.google.com/to/rental/folder"
                fullWidth
                endAdornment={
                  <IconButton href="http://www.google.com" target="_blank">
                    <OpenInNewIcon />
                  </IconButton>
                }
                value={googleDrive}
                onChange={e => setGoogleDrive(e.target.value)}
              />
            </InputWrapper>

            <InputWrapper gridColumn="4 / 10">
              <Button
                type="submit"
                color="primary"
                variant="contained"
                size="large"
                disabled={!title.trim() || !abbr.trim() || !googleDrive.trim()}
                fullWidth
              >{`Create ${title}`}</Button>
            </InputWrapper>
          </GridWrapper>
        </ModalArea>
      </Modal>
    </>
  );
};
