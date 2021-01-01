import React, { useState } from "react";
import Todo from "./Todo";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const TODOLIST_QUERY = gql`
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
  const { loading, error, data } = useQuery(TODOLIST_QUERY);

  let todoList;
  todoList = data ? (data.todoList ? data.todoList : []) : [];
  const open = todoList.filter(val => !val.completed);
  const complete = todoList.filter(val => val.completed);
  const urgent = todoList.filter(val => val.urgent);
  const all = todoList;

  const [state, setState] = useState({
    showing: open || []
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  if (!data) throw new Error("no data");

  const toggleShowing = set => setState({ showing: set });

  return (
    <div>
      {data && (
        <>
          {state.showing.map(todo => (
            <Link
              to={{
                pathname: "/todo",
                state: {
                  todo: todo
                }
              }}
              key={todo._id}
              className={`no-underline todo ${todo.urgent ? "red" : "black"}`}
            >
              <Todo key={todo._id} todo={todo} />
            </Link>
          ))}
        </>
      )}
      <div className="flex mt3">
        <button
          className="pointer mr2 button"
          onClick={() => toggleShowing(open)}
        >
          Show Open
        </button>

        <button
          className="pointer mr2 button"
          onClick={() => toggleShowing(complete)}
        >
          Completed Only
        </button>

        <button
          className="pointer button"
          onClick={() => toggleShowing(urgent)}
        >
          Urgent Only
        </button>

        <button className="pointer button" onClick={() => toggleShowing(all)}>
          Show All
        </button>
      </div>
    </div>
  );
};

export default TodoList;
