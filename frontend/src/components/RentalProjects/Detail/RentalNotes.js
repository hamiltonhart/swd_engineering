import React from "react";

import { SectionHeading } from "../../../styled/typography";

import { SimpleDiv, PositionWrapper } from "../../../styled/containers";
import { EditNotesModal } from "./ButtonModals";

import { makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    marginLeft: theme.spacing(6),
    paddingTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  gutter: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export const RentalNotes = ({ notes, projectId }) => {
  const classes = useStyles();
  return (
    <>
      <SectionHeading gridColumn>Notes</SectionHeading>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div
              dangerouslySetInnerHTML={{
                __html: notes ? notes.replace(/\r?\n/g, "<br />") : null,
              }}
            />
          </Grid>
          <Grid item xs={12} className={classes.gutter}>
            <EditNotesModal currentNotes={notes} projectId={projectId} />
          </Grid>
        </Grid>
      </div>
    </>
  );
};
