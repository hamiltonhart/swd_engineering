import React, { useState } from "react";
import { useModal } from "../../../../utils";

import { Modal, ModalArea, ModalCloseIcon } from "../../../utilities";
import { PageHeading } from "../../../../styled/typography";
import { GridWrapper, InputWrapper } from "../../../../styled/containers";
import { Error } from "../../../global";

import {
  makeStyles,
  Button,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  TextField,
  FormControl,
} from "@material-ui/core";

import OpenInNewIcon from "@material-ui/icons/OpenInNew";

import { EDIT_BASIC_INFO } from "../../../../gql";
import { useMutation } from "@apollo/react-hooks";

const useStyles = makeStyles({
  label: {
    paddingLeft: "12px",
  },
});

export const EditBasicInfo = ({ project, projectId }) => {
  const [title, setTitle] = useState(project.title);
  const [abbr, setAbbr] = useState(project.abbreviation);
  const [driveUser, setDriveUser] = useState(project.driveUser || "");
  const [drivePass, setDrivePass] = useState(project.drivePass || "");
  const [msUser, setMsUser] = useState(project.msUser || "");
  const [msPass, setMsPass] = useState(project.msPass || "");
  const [googleDrive, setGoogleDrive] = useState(project.filesLink || "");
  const [season, setSeason] = useState(project.season || "");
  const [channelConfig, setChannelConfig] = useState(project.channelConfig);

  const { isShowing, toggle } = useModal();

  const [updateRentalProject, { error }] = useMutation(EDIT_BASIC_INFO);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateRentalProject({
      variables: {
        id: projectId,
        title,
        abbreviation: abbr,
        driveUser: driveUser || "n/a",
        drivePass: drivePass || "n/a",
        msUser: msUser || "n/a",
        msPass: msPass || "n/a",
        filesLink: googleDrive,
        season: season || 999,
        channelConfig,
      },
    });
    console.log(res);
    updateComplete(res);
  };

  const updateComplete = (res) => {
    console.log(res);
  };

  const cancelToggle = () => {
    setTitle(project.title);
    setAbbr(project.abbreviation);
    setDriveUser(project.driveUser);
    setDrivePass(project.drivePass);
    setMsUser(project.msUser);
    setMsPass(project.MsPass);
    setGoogleDrive(project.filesLink);
    setSeason(project.season);
    setChannelConfig(project.channelConfig);
    toggle();
  };

  const classes = useStyles();

  return (
    <>
      <Button
        color="secondary"
        variant="outlined"
        size="small"
        onClick={(e) => toggle()}
      >
        Edit Basic Info
      </Button>

      <Modal isShowing={isShowing}>
        <ModalArea>
          <ModalCloseIcon toggle={cancelToggle} />

          <PageHeading>Edit Info</PageHeading>
          <GridWrapper
            as="form"
            minWidth="622px;"
            maxWidth="622px;"
            margin="20px 0 0 0 "
            onSubmit={(e) => handleSubmit(e)}
          >
            <InputWrapper gridColumn="span 6">
              <TextField
                labelId="title-label"
                id="title-input"
                color="primary"
                label="Title"
                fullWidth
                required
                placeholder="Star Wars"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputWrapper>

            <InputWrapper gridColumn="span 2">
              <TextField
                labelId="season-label"
                id="season-input"
                placeholder="1"
                label="Season"
                value={season}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setSeason(e.target.value)}
              />
            </InputWrapper>

            <InputWrapper gridColumn="span 3">
              <FormControl fullWidth variant="outlined">
                <InputLabel id="config-label" required>
                  Config
                </InputLabel>
                <Select
                  labelId="config-label"
                  id="config-input"
                  color="primary"
                  label="Config"
                  fullWidth
                  required
                  value={channelConfig}
                  onChange={(e) => setChannelConfig(e.target.value)}
                >
                  <MenuItem value="ST">Stereo</MenuItem>
                  <MenuItem value="5.1">5.1</MenuItem>
                  <MenuItem value="7.1">7.1</MenuItem>
                  <MenuItem value="ATMOS">ATMOS</MenuItem>
                  <MenuItem value="DTS">DTS</MenuItem>
                  <MenuItem value="IMAX 6">IMAX 6</MenuItem>
                  <MenuItem value="IMAX 12">IMAX 12</MenuItem>
                </Select>
              </FormControl>
            </InputWrapper>

            <InputWrapper gridColumn="span 4" gridRow="2">
              <TextField
                labelId="abbr-label"
                id="abbr-input"
                color="primary"
                label="Abbreviation"
                fullWidth
                required
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="starwars "
                value={abbr}
                onChange={(e) => setAbbr(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper gridColumn="span 4" gridRow="3">
              <TextField
                labelId="drive-user-label"
                id="drive-user-input"
                color="primary"
                label="Drive Username"
                fullWidth
                placeholder="starwars"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={driveUser}
                onChange={(e) => setDriveUser(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper gridColumn="span 4" gridRow="3">
              <TextField
                labelId="drive-pass-label"
                id="drive-pass-input"
                color="primary"
                label="Drive Password"
                fullWidth
                placeholder="starwars"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={drivePass}
                onChange={(e) => setDrivePass(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper gridColumn="span 4" gridRow="4">
              <TextField
                labelId="ms-user-label"
                id="ms-user-input"
                color="primary"
                label="MS Username"
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="starwars "
                value={msUser}
                onChange={(e) => setMsUser(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper gridColumn="span 4" gridRow="4">
              <TextField
                labelId="ms-pass-label"
                id="ms-pass-input"
                color="primary"
                label="MS Password"
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="starwars "
                value={msPass}
                onChange={(e) => setMsPass(e.target.value)}
              />
            </InputWrapper>

            <InputWrapper gridColumn="span 12">
              <TextField
                labelId="files-link-label"
                id="files-link-input"
                placeholder="http://drive.google.com/to/rental/folder"
                label="GoogleDrive"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                endAdornment={
                  <IconButton href="http://www.google.com" target="_blank">
                    <OpenInNewIcon />
                  </IconButton>
                }
                required
                value={googleDrive}
                onChange={(e) => setGoogleDrive(e.target.value)}
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
              >{`Confirm ${title}`}</Button>
            </InputWrapper>
          </GridWrapper>
          {error && <Error error={error} />}
        </ModalArea>
      </Modal>
    </>
  );
};
