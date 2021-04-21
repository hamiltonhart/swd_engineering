import React from "react";

import { SectionHeading } from "../../../styled/typography";
import { EditBasicInfo } from "./ButtonModals/EditBasicInfo";
import { makeStyles, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    marginLeft: theme.spacing(6),
    paddingTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  labelText: {
    color: theme.palette.grey[600],
  },
  gutter: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const UserPassContainer = ({ label, info }) => {
  const classes = useStyles();
  return (
    <Grid item container xs={12} spacing={1}>
      <Grid item xs={6}>
        <Typography className={classes.labelText}>{`${label}:`}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>{info}</Typography>
      </Grid>
    </Grid>
  );
};

export const RentalBasicInfo = ({ project }) => {
  const classes = useStyles();
  return (
    <>
      <SectionHeading gridColumn>Basic Information</SectionHeading>
      <div className={classes.root}>
        <Grid container spacing={3}>
          {/* Grid Left */}
          <Grid item container xs={6} spacing={1}>
            <UserPassContainer
              label="Abbreviation"
              info={project.abbreviation}
            />
            <UserPassContainer
              label="Primary Room"
              info={
                project.primaryRoom ? project.primaryRoom.room.name : "Not set"
              }
            />
            <UserPassContainer
              label="Channel Config"
              info={project.channelConfig}
            />
          </Grid>
          {/* Grid Right */}
          <Grid item container xs={6} spacing={1}>
            <UserPassContainer
              label="Drive Username"
              info={project.driveUser ? project.driveUser : "Not Set"}
            />
            <UserPassContainer
              label="Drive Password"
              info={project.drivePass ? project.drivePass : "Not set"}
            />
            <UserPassContainer
              label="MS Username"
              info={project.msUser ? project.msUser : "Not set"}
            />
            <UserPassContainer
              label="MS Password"
              info={project.msPass ? project.msPass : "Not set"}
            />
          </Grid>
          {/* Action Buttons */}
          <Grid item xs={12} className={classes.gutter}>
            <EditBasicInfo project={project} projectId={project.id} />
          </Grid>
        </Grid>
      </div>
    </>
  );
};
