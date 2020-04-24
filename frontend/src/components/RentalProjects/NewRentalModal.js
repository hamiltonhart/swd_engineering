import React, { useState } from "react";
import { useModal } from "../../utils";
import { Redirect } from "react-router-dom";

import { useMutation } from "@apollo/react-hooks";
import { CREATE_RENTAL, HOME_PAGE_QUERY, GET_RENTALS_QUERY } from "../../gql";

import { Modal, ModalArea, ModalCloseIcon } from "../utilities";
import { PageHeading } from "../../styled/typography";
import { GridWrapper, InputWrapper } from "../../styled/containers";
import { Error } from "../global";

import {
  makeStyles,
  Button,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  TextField,
  FormControl,
} from "@material-ui/core";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

const useStyles = makeStyles((theme) => ({
  button: {
    fontWeight: theme.typography.fontWeightBold,
  },
  select: {
    minWidth: "212px",
  },
  label: {
    paddingLeft: "12px",
  },
  search: {},
}));

export const NewRentalModal = () => {
  const [newRentalId, setNewRentalId] = useState("");
  const [title, setTitle] = useState("");
  const [abbr, setAbbr] = useState("");
  const [googleDrive, setGoogleDrive] = useState("");
  const [season, setSeason] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [channelConfig, setChannelConfig] = useState("5.1");

  const { isShowing, toggle } = useModal();

  const [createRentalProject, { error }] = useMutation(CREATE_RENTAL);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createRentalProject({
      variables: {
        title,
        abbreviation: abbr,
        filesLink: googleDrive,
        channelConfig,
        season,
        startDate,
      },
      refetchQueries: [
        { query: GET_RENTALS_QUERY },
        { query: HOME_PAGE_QUERY, variables: { limit: 8, reverse: true } },
      ],
    });
    if (res.data.createRentalProject.project) {
      setNewRentalId(res.data.createRentalProject.project.id);
    } else if (error) {
      return <Error error={error} />;
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

      <Button
        className={classes.button}
        color="primary"
        variant="contained"
        large
        onClick={() => toggle()}
      >
        New Rental
      </Button>

      <Modal isShowing={isShowing}>
        <ModalArea>
          <ModalCloseIcon toggle={handleToggle} />

          <PageHeading>New Rental</PageHeading>
          <GridWrapper
            as="form"
            minWidth="622px;"
            maxWidth="622px;"
            margin="20px 0 0 0 "
            onSubmit={(e) => handleSubmit(e)}
          >
            <InputWrapper gridColumn="span 6">
              <TextField
                placeholder="Star Wars"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                label="Title"
                required
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </InputWrapper>

            <InputWrapper gridColumn="span 2">
              <TextField
                placeholder="1"
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                label="Season"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </InputWrapper>

            <InputWrapper gridColumn="span 4">
              <TextField
                placeholder="starwars "
                value={abbr}
                onChange={(e) => setAbbr(e.target.value)}
                label="Abbreviation"
                required
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </InputWrapper>

            <InputWrapper gridColumn="span 3">
              <FormControl fullWidth variant="outlined">
                <InputLabel id="new-rental-config-label">Config</InputLabel>
                <Select
                  color="primary"
                  variant="outlined"
                  labelId="new-rental-config-label"
                  label="Config"
                  fullWidth
                  defaultValue={channelConfig}
                  onChange={(e) => setChannelConfig(e.target.value)}
                >
                  <MenuItem value="ST">Stereo</MenuItem>
                  <MenuItem value="5.1">5.1</MenuItem>
                  <MenuItem value="7.1">7.1</MenuItem>
                  <MenuItem value="ATMOS">ATMOS</MenuItem>
                  <MenuItem value="DTS">DTS</MenuItem>
                  <MenuItem value="IMAX6">IMAX 6</MenuItem>
                  <MenuItem value="IMAX12">IMAX 12</MenuItem>
                </Select>
              </FormControl>
            </InputWrapper>

            <InputWrapper gridColumn="span 4">
              <TextField
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                label="Start Date"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </InputWrapper>

            <InputWrapper gridColumn="span 12">
              <TextField
                placeholder="http://drive.google.com/to/rental/folder"
                fullWidth
                required
                InputProps={{
                  endAdornment: (
                    <IconButton href="http://www.google.com" target="_blank">
                      <OpenInNewIcon />
                    </IconButton>
                  ),
                }}
                value={googleDrive}
                onChange={(e) => setGoogleDrive(e.target.value)}
                label="GoogleDrive"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
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
