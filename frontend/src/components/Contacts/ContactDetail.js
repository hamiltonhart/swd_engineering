import React from "react";

import { useQuery } from "@apollo/react-hooks";
import { CONTACT_QUERY } from "../../gql";

import { makeStyles, Typography, IconButton, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";

import { Error, Loading } from "../global";
import { ContactEdit } from "./ContactEdit";
import { Link } from "react-router-dom";
import { NewContactIconButton } from "./ContactUtilities/NewContactIconButton";
import { NewContactFull } from "./NewContactFull";

const useStyles = makeStyles((theme) => ({
  heading: {
    display: "flex",
    justifyContent: "space-between",
    "& div": {
      display: "flex",
      alignItems: "center",
    },
  },
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
  defaultView: {
    display: "flex",
    flexDirection: "column",
  },
  newContactText: {
    fontSize: "1.6em",
  },
}));

export const ContactDetail = ({
  contactId,
  setContactId,
  isShowingEdit,
  toggleEdit,
  isShowingNew,
  toggleNew,
}) => {
  const { data, loading, error } = useQuery(CONTACT_QUERY, {
    variables: { id: contactId },
  });

  const handleEditOpen = () => {
    if (isShowingNew) {
      toggleNew();
      toggleEdit();
    } else {
      toggleEdit();
    }
  };

  const handleNewOpen = () => {
    if (isShowingEdit) {
      toggleEdit();
      setContactId(null);
      toggleNew();
    } else {
      setContactId(null);
      toggleNew();
    }
  };

  const classes = useStyles();
  return (
    <>
      {contactId ? (
        <>
          {loading && <Loading />}
          {error && <Error error={error} />}
          {data && (
            <>
              <div className={classes.heading}>
                <div>
                  <Typography align="left" variant="h4" color="primary">
                    {`${data.contact.firstName} ${data.contact.lastName}`}
                  </Typography>
                  <IconButton onClick={handleEditOpen}>
                    {isShowingEdit ? <CloseIcon /> : <EditIcon />}
                  </IconButton>
                </div>
                {!isShowingEdit && (
                  <NewContactIconButton onClick={handleNewOpen} />
                )}
              </div>
              {!isShowingEdit && !isShowingNew ? (
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
              ) : (
                <>
                  {isShowingNew ? (
                    <NewContactFull
                      toggleNew={toggleNew}
                      setContactId={setContactId}
                    />
                  ) : (
                    <ContactEdit
                      contact={data.contact}
                      setContactId={setContactId}
                      toggleEdit={toggleEdit}
                    />
                  )}
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {!isShowingNew ? (
            <div className={classes.defaultView}>
              <Typography align="center" variant="h4">
                Select a contact
              </Typography>
              <Typography align="center" variant="h4">
                or
              </Typography>
              <Button
                className={classes.newContactText}
                color="primary"
                onClick={handleNewOpen}
              >
                Add a New Contact
              </Button>
            </div>
          ) : (
            <NewContactFull toggleNew={toggleNew} setContactId={setContactId} />
          )}
        </>
      )}
    </>
  );
};
