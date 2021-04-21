import React, { useState } from "react";

import { useMutation, useQuery } from "@apollo/react-hooks";
import { ALL_CONTACTS_QUERY, CREATE_RENTAL_CLIENT } from "../../../gql";

import {
  makeStyles,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";

import { NewContactModal } from "../../Contacts";
import { Loading, Error } from "../../global";

const useStyles = makeStyles(() => ({
  form: {
    width: "100%",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
  },
}));

export const RentalClientsManage = ({ rentalId }) => {
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedClientRole, setSelectedClientRole] = useState("");

  const { data, loading, error } = useQuery(ALL_CONTACTS_QUERY);
  const [createRentalClient, { error: rentalClientError }] = useMutation(
    CREATE_RENTAL_CLIENT
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    createRentalClient({
      variables: {
        clientId: selectedClient,
        projectId: rentalId,
        clientRole: selectedClientRole,
      },
    });
  };

  const classes = useStyles();

  return (
    <>
      {loading && <Loading />}
      {error && <Error error={error} />}
      {rentalClientError && <Error error={rentalClientError} />}
      {data && (
        <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
          {console.log(data.contacts)}
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={12} fullWidth>
              <FormControl fullWidth>
                <Select
                  id="client-select-input"
                  labelId="client-role-select-label"
                  variant="outlined"
                  color="primary"
                  displayEmpty
                  fullWidth
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                >
                  <MenuItem value="" disabled>
                    Client
                  </MenuItem>
                  {data.contacts.map((contact) => (
                    <MenuItem key={contact.id} value={contact.id}>
                      {`${contact.firstName} ${contact.lastName}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <Select
                  id="client-role-select-input"
                  labelId="client-role-select-label"
                  variant="outlined"
                  color="primary"
                  placeholder="Role"
                  fullWidth
                  value={selectedClientRole}
                  displayEmpty
                  onChange={(e) => setSelectedClientRole(e.target.value)}
                >
                  <MenuItem value="" disabled>
                    Role
                  </MenuItem>
                  <MenuItem value="DX Mixer">DX Mixer</MenuItem>
                  <MenuItem value="MX Mixer">MX Mixer</MenuItem>
                  <MenuItem value="DX/MX Mixer">DX/MX Mixer</MenuItem>
                  <MenuItem value="FX Mixer">FX Mixer</MenuItem>
                  <MenuItem value="Recordist">Recordist</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} className={classes.buttonContainer}>
              <Button size="small">Remove Client</Button>
              <Button size="small" variant="outlined">
                Add / Edit Client
              </Button>
            </Grid>
            <Grid item xs={12} className={classes.buttonContainer}>
              <NewContactModal />
            </Grid>
          </Grid>
        </form>
      )}
    </>
  );
};
