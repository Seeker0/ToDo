import React from "react";
import Todo from "./Todo";
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
            <Todo key={todo._id} todo={todo} />
          ))}
        </>
      )}
    </div>
  );
};

export default TodoList;
