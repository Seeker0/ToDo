import React from "react";
import { AUTH_TOKEN } from "../constants";
import { useHistory, withRouter, Link } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";

const LOGOUT_MUTATION = gql`
  mutation LogoutMutation {
    logout {
      _id
      user
      message
    }
  }
`;

const Header = function() {
  const history = useHistory();
  let token = localStorage.getItem(AUTH_TOKEN);

  const [logout] = useMutation(LOGOUT_MUTATION, {
    variables: {},
    onCompleted: ({ logout }) => {
      localStorage.setItem(AUTH_TOKEN, "");
      return history.push("/");
    }
  });

  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex flex-fixed black">
        <div className="fw7 mr1">Todo List</div>
        <Link to="/" className="ml1 no-underline black">
          todos
        </Link>

        <div className="ml1">|</div>
        <Link to="/create" className="ml1 no-underline black">
          add
        </Link>
      </div>

      <div className="flex flex-fixed">
        {token && (
          <div className="ml1 pointer black" onClick={logout}>
            logout
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(Header);
