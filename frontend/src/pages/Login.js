import React, { useState } from "react";

import {
  makeStyles,
  Typography,
  TextField,
  Button,
  Box,
  Snackbar
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

import { LOGIN_MUT } from "../gql";
import { useMutation, useApolloClient } from "@apollo/react-hooks";

const useStyles = makeStyles({
  mainContainer: {
    display: "block",
    margin: "10% auto 0 auto",
    borderRadius: "5px",
    maxWidth: "500px"
  },
  formInput: {
    margin: "10px 0"
  },
  pageHeading: {
    textTransform: "uppercase"
  }
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [tokenAuth, { error }] = useMutation(LOGIN_MUT);
  const client = useApolloClient();

  const formSubmit = async (e, username, password) => {
    e.preventDefault();
    const res = await tokenAuth({
      variables: { username: username, password: password }
    });
    localStorage.setItem("authToken", res.data.tokenAuth.token);
    client.writeData({ data: { isLoggedIn: true } });
  };

  return (
    <Box className={classes.mainContainer} boxShadow={3} p={5}>
      <Typography className={classes.pageHeading} variant="h2" align="center">
        Login
      </Typography>
      {error && (
        <Snackbar open={true}>
          <Alert severity="error">{error.message}</Alert>
        </Snackbar>
      )}
      <Box
        component="form"
        className={classes.form}
        onSubmit={e => formSubmit(e, username, password)}
      >
        <TextField
          label="Username"
          placeholder="Username"
          className={classes.formInput}
          variant="outlined"
          fullWidth
          required
          onChange={e => setUsername(e.target.value)}
          value={username}
        />

        <TextField
          label="Password"
          placeholder="Password"
          type="password"
          variant="outlined"
          className={classes.formInput}
          required
          fullWidth
          onChange={e => setPassword(e.target.value)}
          value={password}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          className={classes.formInput}
          fullWidth
          disabled={!username.trim() || !password.trim()}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};
