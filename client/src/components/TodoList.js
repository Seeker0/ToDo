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

  const toggleShowing = set => setState({ ...state, showing: set });
  const buttons = (() => {
    let buttons = [];
    for (let key in state) {
      const selected = state.showing === key;
      if (key === "showing") continue;
      buttons.push(
        <button
          name={key}
          key={key}
          disabled={selected}
          className={`pointer mr2 ${selected ? "selected" : "button"}`}
          onClick={() => toggleShowing(key)}
        >
          {key}
        </button>
      );
    }
    return buttons;
  })();

  return (
    <div>
      {state[state.showing].map(todo => (
        <TodoLink key={todo._id} todo={todo} />
      ))}

      <div className="flex mt3">{buttons}</div>
    </div>
  );
};

export default TodoList;
