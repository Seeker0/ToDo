import React, { useState } from "react";
import { AUTH_TOKEN } from "../constants";
import { useHistory } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      _id
      user
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      user
    }
  }
`;

const Login = function() {
  const history = useHistory();
  const [formState, setFormState] = useState({
    login: true,
    email: "",
    password: "",
    name: "",
    authToken: localStorage.getItem(AUTH_TOKEN)
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login._id);
      return history.push("/");
    }
  });

  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formState.name,
      email: formState.email,
      password: formState.password
    },
    onCompleted: ({ signup }) => {
      localStorage.setItem(AUTH_TOKEN, signup._id);
      return history.push("/");
    }
  });

  return (
    <div>
      <h4 className="mv3">{formState.login ? "Login" : "Sign Up"}</h4>

      <div className="flex flex-column">
        {!formState.login && (
          <input
            value={formState.username}
            onChange={e =>
              setFormState({ ...formState, username: e.target.value })
            }
            type="text"
            placeholder="Username"
          />
        )}

        <input
          value={formState.email}
          onChange={e => setFormState({ ...formState, email: e.target.value })}
          type="text"
          placeholder="Email"
        />

        <input
          value={formState.password}
          onChange={e =>
            setFormState({ ...formState, password: e.target.value })
          }
          type="text"
          placeholder="Password"
        />
      </div>

      <div className="flex mt3">
        <button
          className="pointer mr2 button"
          onClick={formState.login ? login : signup}
        >
          {formState.login ? "Login" : "Create Account"}
        </button>

        <button
          className="pointer button"
          onClick={e => setFormState({ ...formState, login: !formState.login })}
        >
          {formState.login
            ? "Need to create an account?"
            : "Already have an account?"}
        </button>
      </div>
    </div>
  );
};

export default Login;
