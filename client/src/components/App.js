import React from "react";
import { CreateTodo, Header, TodoList, Login } from "./index";
import { Switch, Route } from "react-router-dom";
const token = localStorage.getItem("token");

const App = () =>
  token ? (
    <div className="center w85">
      <Header />

      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={TodoList} />
          <Route exact path="/create" component={CreateTodo} />
          <Route exact path="/login" component={Login} />
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

export default App;
