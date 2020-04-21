import React, { useState } from "react";

import {
  makeStyles,
  Button,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormControl,
} from "@material-ui/core";

import { useMutation } from "@apollo/react-hooks";
import {
  CREATE_DRIVE,
  ALL_DRIVES_QUERY,
  HOME_PAGE_QUERY,
  GET_LAST_DRIVE,
} from "../../gql";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

export const NewDriveForm = ({ toggle, nextDriveNumber }) => {
  const [createDrive, { error: createError }] = useMutation(CREATE_DRIVE);

  const [driveNumber, setDriveNumber] = useState(`${nextDriveNumber}`);
  const [driveCapacityGb, setDriveCapacityGb] = useState("2TB");
  const [driveQuantity, setDriveQuantity] = useState("1");

  const handleSubmit = (e) => {
    e.preventDefault();
    createDrive({
      variables: {
        driveNumber,
        driveCapacityGb,
        numberOfDrives: driveQuantity,
      },
      refetchQueries: [
        { query: ALL_DRIVES_QUERY },
        { query: HOME_PAGE_QUERY },
        { query: GET_LAST_DRIVE },
      ],
      onCompleted: createDriveCompleted(),
    });
  };

  const createDriveCompleted = () => {
    toggle();
  };

  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.root}
      component="form"
      spacing={2}
      onSubmit={(e) => handleSubmit(e)}
    >
      <Grid item xs={12} sm={4}>
        <TextField
          label="Drive Number"
          placeholder="ex. 1"
          variant="outlined"
          defaultValue={driveNumber}
          helperText="Next available is auto-filled"
          fullWidth
          required
          autoFocus
          onChange={(e) => setDriveNumber(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <FormControl fullWidth variant="outlined" required>
          <InputLabel id="drive-capacity-label">Capacity</InputLabel>
          <Select
            labelId="drive-capacity-label"
            label="Capacity"
            id="drive-capacity-select"
            color="primary"
            fullWidth
            defaultValue={driveCapacityGb}
            onChange={(e) => setDriveCapacityGb(e.target.value)}
          >
            <MenuItem value="250GB">250GB</MenuItem>
            <MenuItem value="500GB">500GB</MenuItem>
            <MenuItem value="1TB">1TB</MenuItem>
            <MenuItem value="2TB">2TB</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Drive Quantity"
          placeholder="ex. 1"
          variant="outlined"
          defaultValue={driveQuantity}
          helperText="Drive Number will increment"
          fullWidth
          required
          onChange={(e) => setDriveQuantity(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>

      <Grid container item xs={12} justify="flex-end">
        <Button
          type="submit"
          size="large"
          variant="contained"
          color="primary"
          disabled={
            !driveNumber.trim() ||
            !driveCapacityGb | !driveQuantity.trim() ||
            driveQuantity == 0
          }
        >
          Create Drives
        </Button>
      </Grid>
    </Grid>
  );
};
