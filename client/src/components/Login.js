import React, { useState } from "react";
import { useHistory } from "react-router";
import { useMutation, gql } from "@apollo/client";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Login = () => {
  const history = useHistory();

  const [formState, setFormState] = useState({
    login: true,
    email: "",
    password: "",
    username: ""
  });

  const mutationConfig = {
    variables: {
      email: formState.email,
      password: formState.password
    },
    onCompleted: ({ token }) => {
      localStorage.setItem("token", token._id);
      history.push("/");
    }
  };

  const [login] = useMutation(LOGIN_MUTATION, mutationConfig);

  const [signup] = useMutation(SIGNUP_MUTATION, mutationConfig);

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
