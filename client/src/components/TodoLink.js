import React from "react";
import { Link } from "react-router-dom";
import Todo from "./Todo";

const TodoLink = props => {
  const { todo } = props;

  return (
    <Link
      to={{
        pathname: "/todo",
        state: {
          todo: todo
        }
      }}
      className={`no-underline todo ${todo.urgent ? "red" : "black"}`}
    >
      <Todo key={todo._id} todo={todo} />
    </Link>
  );
};

export default TodoLink;
