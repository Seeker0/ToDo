import React, { useEffect } from "react";
import { CreateTodo, Header, TodoList, Login, Todo } from "./index";
import { Switch, Route, withRouter, useHistory } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";

const App = function() {
  let token = localStorage.getItem(AUTH_TOKEN);

  return token ? (
    <div className="center w85">
      <Header />

      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={TodoList} />
          <Route exact path="/create" component={CreateTodo} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/todo" component={Todo} />
        </Switch>
      </div>
    </div>
  ) : (
    <div className="center w85">
      <Header />

      <div className="ph3 pv1 background-gray">
        <Login />
      </div>
    </div>
  );
};

export default withRouter(App);
