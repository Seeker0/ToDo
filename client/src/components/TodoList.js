import React, { useState } from "react";
import TodoLink from "./TodoLink";
import { useQuery, gql } from "@apollo/client";

export const TODOLIST_QUERY = gql`
  {
    todoList {
      _id
      title
      description
      enteredOn
      completed
      completeBy
      urgent
    }
  }
`;

const TodoList = () => {
  const [state, setState] = useState({
    showing: "open",
    open: [{ _id: 0, title: "Loading....", description: "" }],
    completed: null,
    urgent: null,
    all: null
  });

  useQuery(TODOLIST_QUERY, {
    onCompleted: ({ todoList }) => {
      const openOnly = todoList.filter(val => !val.completed);
      const stateUpdate = {
        showing: "open",
        open: openOnly,
        completed: todoList.filter(val => val.completed),
        urgent: todoList.filter(val => val.urgent),
        all: todoList
      };

      setState(stateUpdate);
    }
  });

  const buttons = [
    <button
      name="open"
      key="open"
      className="pointer mr2 button"
      onClick={() => toggleShowing("open")}
    >
      Show Open
    </button>,
    <button
      name="completed"
      key="completed"
      className="pointer mr2 button"
      onClick={() => toggleShowing("completed")}
    >
      Completed Only
    </button>,
    <button
      name="urgent"
      key="urgent"
      className="pointer button"
      onClick={() => toggleShowing("urgent")}
    >
      Urgent Only
    </button>,
    <button
      name="all"
      key="all"
      className="pointer button"
      onClick={() => toggleShowing("all")}
    >
      Show All
    </button>
  ];

  const toggleShowing = set => setState({ ...state, showing: set });

  return (
    <div>
      {state[state.showing].map(todo => (
        <TodoLink key={todo._id} todo={todo} />
      ))}

      <div className="flex mt3">
        {buttons.filter(button => button.props.name !== state.showing)}
      </div>
    </div>
  );
};

export default TodoList;
