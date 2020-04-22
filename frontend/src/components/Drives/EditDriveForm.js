import React, { useState } from "react";

import {
  makeStyles,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@material-ui/core";

import { useMutation } from "@apollo/react-hooks";
import { UPDATE_DRIVE } from "../../gql";

import { Error } from "../global";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export const EditDriveForm = ({ toggle, driveId, drive }) => {
  const [updateDrive, { error }] = useMutation(UPDATE_DRIVE);

  const [driveNumber, setDriveNumber] = useState(`${drive.driveNumber}`);
  const [driveCapacityGb, setDriveCapacityGb] = useState(drive.driveCapacityGb);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateDrive({
      variables: {
        id: driveId,
        driveNumber,
        driveCapacityGb,
      },
      onCompleted: editDriveCompleted(),
    });
  };

  const editDriveCompleted = () => {
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
      {error && <Error error={error} />}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Drive Number"
          placeholder="ex. 1"
          variant="outlined"
          defaultValue={driveNumber}
          fullWidth
          required
          onChange={(e) => setDriveNumber(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
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

      <Grid container item xs={12} justify="flex-end">
        <Button
          type="submit"
          size="large"
          variant="contained"
          color="primary"
          disabled={!driveNumber.trim() || !driveCapacityGb}
        >
          Edit
        </Button>
      </Grid>
    </Grid>
  );
};
