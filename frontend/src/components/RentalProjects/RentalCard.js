import React from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { FlexWrapper, SimpleDiv } from "../../styled/containers";
import { CardSubheading } from "../../styled/typography";
import { Dot } from "../../styled/utilities";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "250px",
    "&:hover": {
      boxShadow: theme.shadows[5],
    },
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: theme.palette.grey[200],
  },
}));

export const RentalCard = ({ rental }) => {
  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  const classes = useStyles();
  return (
    <Card
      className={classes.root}
      as={Link}
      to={{ pathname: `/rentals/${rental.id}`, state: { rentalId: rental.id } }}
    >
      <CardContent>
        <Typography
          color="primary"
          variant="h6"
          component={Link}
          to={{
            pathname: `/rentals/${rental.id}`,
            state: { rentalId: rental.id },
          }}
        >
          {rental.season
            ? `${rental.title} - S${rental.season}`
            : `${rental.title}`}
        </Typography>
        <FlexWrapper justifyContent="left" padding="8px 0 0 0">
          <Dot color="0" />
          <CardSubheading>{rental.abbreviation}</CardSubheading>
        </FlexWrapper>
        <SimpleDiv padding="16px 0 0 0 " className="handle-link">
          <p>
            Room:{" "}
            {(rental.primaryRoom && rental.primaryRoom.room.name) || "---"}
          </p>
          <p>Drives: {rental.totalDrives || "---"}</p>
          <p>Config: {rental.channelConfig || "---"}</p>
        </SimpleDiv>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          href={rental.filesLink}
          target="_blank"
          size="small"
          color="primary"
          endIcon={<OpenInNewIcon />}
          onClick={(e) => handleLinkClick(e)}
        >
          Go To Files
        </Button>
      </CardActions>
    </Card>
  );
};
