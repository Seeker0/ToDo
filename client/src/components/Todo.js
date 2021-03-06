import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UPDATE_MUTATION, DELETE_MUTATION } from "../gqls";

const Todo = props => {
  const location = useLocation();
  const history = useHistory();

  const { todo } = location.state ? location.state : props;
  const [state, setState] = useState({
    id: todo._id,
    urgent: todo.urgent,
    completed: todo.completed
  });

  const focused = location.pathname === "/todo" ? true : false;

  const [deleter] = useMutation(DELETE_MUTATION, {
    variables: {
      id: todo._id
    },
    onCompleted: data => {
      console.log(data);
      return history.push("/");
    }
  });

  const [update] = useMutation(UPDATE_MUTATION, {
    variables: {
      id: state.id,
      urgent: state.urgent,
      completed: state.completed
    },
    onCompleted: data => {
      return history.push("/");
    }
  });

  const todoDisplay = focused ? (
    <div className="">
      <div className={`todo ${todo.completed ? "darkGray" : ""}`}>
        <div className="todoText">
          <div>
            {todo.title} ({todo.description || "I am empty"})
          </div>
        </div>
        <div className="form-check todoUpdate">
          <div>
            <input
              className="form-check-input"
              type="checkbox"
              checked={state.urgent}
              onChange={e => {
                setState({ ...state, urgent: !state.urgent, completed: false });
              }}
            />
            Urgent
          </div>

          <div>
            <input
              className="form-check-input"
              type="checkbox"
              checked={state.completed}
              onChange={e => {
                setState({
                  ...state,
                  completed: !state.completed,
                  urgent: false
                });
              }}
            />
            Completed
          </div>
        </div>
      </div>
      {focused && (
        <div className="flex mt3">
          <button className="pointer mr2 button" onClick={update}>
            Update
          </button>

          <button className="pointer button" onClick={deleter}>
            Delete
          </button>
        </div>
      )}
    </div>
  ) : (
    <div className={`${todo.urgent ? "red" : "black"}`}>
      <div className={`todo ${todo.completed ? "darkGray" : ""}`}>
        {todo.title} ({todo.description || "I am empty"})
      </div>
    </div>
  );

  return todoDisplay;
};

export default Todo;
