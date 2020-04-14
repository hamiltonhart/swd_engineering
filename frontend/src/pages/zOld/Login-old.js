import React, { useState } from "react";

import { PageHeading } from "../../styled/typography";
import { FlexWrapper, InputWrapper } from "../../styled/containers";
import { Input, Label } from "../../styled/forms";
import { RedButton, InactiveButton } from "../../styled/buttons";

import { LOGIN_MUT } from "../../gql";
import { useMutation, useApolloClient } from "@apollo/react-hooks";

export const Login = () => {
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
    <FlexWrapper>
      <FlexWrapper
        flexDirection="column"
        margin="10% 5%"
        border="5px solid black"
        borderRadius="10px"
        padding="20px"
        maxWidth="400px"
      >
        <PageHeading>Login</PageHeading>
        <FlexWrapper
          as="form"
          onSubmit={e => formSubmit(e, username, password)}
        >
          <InputWrapper>
            <Label>Username</Label>
            <Input
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            {username && password ? (
              <RedButton
                as="input"
                type="submit"
                minWidth="100%"
                value="Login"
              />
            ) : (
              <InactiveButton minWidth="100%" inactive>
                Login
              </InactiveButton>
            )}
          </InputWrapper>
          {error && <h1>{error.message}</h1>}
        </FlexWrapper>
      </FlexWrapper>
    </FlexWrapper>
  );
};
