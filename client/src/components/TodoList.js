import React from "react";
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
  const { data } = useQuery(TODOLIST_QUERY);

  return (
    <div>
      {data && (
        <>
          {data.todoList.map(todo => (
            <Link
              to={{
                pathname: "/todo",
                state: {
                  todo: todo
                }
              }}
              key={todo._id}
              className="no-underline black"
            >
              <Todo key={todo._id} todo={todo} />
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default TodoList;
