import React from "react";

import { useQuery } from "@apollo/react-hooks";
import { CONTACT_QUERY } from "../../gql";

import { makeStyles, Typography } from "@material-ui/core";

import { Error, Loading } from "../global";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  heading: {},
  detailBody: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "20% 80%",
    gridGap: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  label: {
    color: theme.palette.grey[700],
    fontSize: ".85em",
    alignSelf: "baseline",
    justifySelf: "stretch",
  },
}));

export const ContactDetail = ({ contactId }) => {
  const { data, loading, error } = useQuery(CONTACT_QUERY, {
    variables: { id: contactId },
  });

  const classes = useStyles();
  return (
    <>
      {contactId ? (
        <>
          {loading && <Loading />}
          {error && <Error error={error} />}
          {data && (
            <div className={classes.root}>
              <Typography
                className={classes.heading}
                align="left"
                variant="h4"
                color="primary"
              >
                {`${data.contact.firstName} ${data.contact.lastName}`}
              </Typography>
              <div className={classes.detailBody}>
                <div className={classes.grid}>
                  <Typography className={classes.label} align="right">
                    Company
                  </Typography>
                  <Typography align="left">{data.contact.company}</Typography>
                </div>
                <div className={classes.grid}>
                  <Typography className={classes.label} align="right">
                    Title
                  </Typography>
                  <Typography align="left">{data.contact.title}</Typography>
                </div>
                <div className={classes.grid}>
                  <Typography className={classes.label} align="right">
                    Phone
                  </Typography>
                  <Typography align="left">
                    {data.contact.phoneNumber}
                  </Typography>
                </div>
                <div className={classes.grid}>
                  <Typography className={classes.label} align="right">
                    Email
                  </Typography>
                  <Typography align="left">{data.contact.email}</Typography>
                </div>
                <div className={classes.grid}>
                  <Typography className={classes.label} align="right">
                    Projects
                  </Typography>
                  <div>
                    {data.contact.rentalProjects.map((rentalProject) => (
                      <Typography
                        component={Link}
                        align="left"
                        to={`/rentals/${rentalProject.project.id}`}
                      >
                        {rentalProject.project.season
                          ? `${rentalProject.project.title} S${rentalProject.project.season}`
                          : `${rentalProject.project.title}`}
                      </Typography>
                    ))}
                  </div>
                </div>
                <div className={classes.grid}>
                  <Typography className={classes.label} align="right">
                    Notes
                  </Typography>
                  <div>
                    <Typography align="left">{data.contact.notes}</Typography>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <Typography className={classes.heading} align="center" variant="h4">
          Select a contact
        </Typography>
      )}
    </>
  );
};
