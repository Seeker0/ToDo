import React from "react";

const Todo = props => {
  const { todo } = props;

  return (
    <div>
      <div>
        {todo.title} ({todo.description || "I am empty"})
      </div>
    </div>
  );
};

export default Todo;
