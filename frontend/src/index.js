import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./styling/theme";

import { Query, ApolloProvider } from "react-apollo";
// import { useQuery } from "@apollo/react-hooks";
import ApolloClient, { gql } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";

import { Login } from "./pages/Login";

const cache = new InMemoryCache();
// const link = new HttpLink({
//   uri: "http://127.0.0.1:8000/graphql/"
// });

const client = new ApolloClient({
  cache,
  uri: "http://127.0.0.1:8000/graphql/",
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    const token = localStorage.getItem("authToken") || "";
    operation.setContext({
      headers: {
        Authorization: `JWT ${token}`
      }
    });
  },
  clientState: {
    defaults: {
      isLoggedIn: !!localStorage.getItem("authToken")
    }
  }
});

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <Query query={IS_LOGGED_IN}>
        {({ data }) => (data.isLoggedIn ? <App /> : <Login />)}
      </Query>
    </ThemeProvider>
  </ApolloProvider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
