import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";

const URGENT_MUTATION = gql`
  mutation UrgentMutation($id: String!, $urgent: Boolean!) {
    updateUrgent(id: $id, urgent: $urgent) {
      _id
      title
      description
      enteredOn
      completeBy
      completed
      urgent
    }
  }
`;

const COMPLETED_MUTATION = gql`
  mutation CompletedMutation($id: String!, $completed: Boolean!) {
    updateCompleted(id: $id, completed: $completed) {
      _id
      title
      description
      enteredOn
      completeBy
      completed
      urgent
    }
  }
`;
const DELETE_MUTATION = gql`
  mutation DeleteMutation($id: String!) {
    deleteTodo(id: $id) {
      _id
      title
    }
  }
`;

const Todo = props => {
  const location = useLocation();
  const history = useHistory();

  const { todo } = location.state ? location.state : props;

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

  const [updateUrgent] = useMutation(URGENT_MUTATION, {
    variables: {
      id: todo._id,
      urgent: true
    },
    onCompleted: data => {
      console.log(data);
      return history.push("/");
    }
  });

  const [updateCompleted] = useMutation(COMPLETED_MUTATION, {
    variables: {
      id: todo._id,
      completed: true
    },
    onCompleted: data => {
      console.log(data);
      return history.push("/");
    }
  });

  return (
    <div className={`${todo.completed ? "darkGray" : ""}`}>
      <div>
        {todo.title} ({todo.description || "I am empty"})
      </div>
      {focused && (
        <div className="flex mt3">
          <button className="pointer mr2 button" onClick={updateCompleted}>
            Mark Completed
          </button>

          <button className="pointer button" onClick={updateUrgent}>
            Mark Urgent
          </button>

          <button className="pointer button" onClick={deleter}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Todo;
