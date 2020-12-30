import React, { useState } from "react";
import { useHistory } from "react-router";
import { useMutation, gql } from "@apollo/client";

const CREATE_TODO_MUTATION = gql`
  mutation PostMutation(
    $title: String!
    $description: String
    $completeBy: String
    $urgent: Boolean!
  ) {
    addTodo(
      title: $title
      description: $description
      completeBy: $completeBy
      urgent: $urgent
    ) {
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

const CreateTodo = () => {
  const history = useHistory();

  const [formState, setFormState] = useState({
    title: "",
    description: "",
    completeBy: "",
    urgent: false
  });

  const [createTodo] = useMutation(CREATE_TODO_MUTATION, {
    variables: {
      title: formState.title,
      description: formState.description,
      completeBy: formState.completeBy,
      urgent: formState.urgent
    },
    onCompleted: () => history.push("/")
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        createTodo();
      }}
    >
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={formState.title}
          onChange={e => {
            setFormState({ ...formState, title: e.target.value });
          }}
          type="text"
          placeholder="New Todo Title"
        />

        <input
          className="mb2"
          value={formState.description}
          onChange={e => {
            setFormState({ ...formState, description: e.target.value });
          }}
          type="text"
          placeholder="Todo Description"
        />

        <input
          className="mb2"
          value={formState.completeBy}
          onChange={e => {
            setFormState({ ...formState, completeBy: e.target.value });
          }}
          type="text"
          placeholder="Complete by Date"
        />

        <label>Urgent Task?</label>
        <div className="form-check">
          <label>
            <input
              className="form-check-input"
              type="radio"
              value={false}
              onChange={e => {
                setFormState({ ...formState, urgent: false });
              }}
              checked={!formState.urgent}
            />
            No
          </label>
        </div>

        <div className="form-check">
          <label>
            <input
              className="form-check-input"
              type="radio"
              value={true}
              onChange={e => {
                setFormState({ ...setFormState, urgent: true });
              }}
              checked={formState.urgent}
            />
            Yes
          </label>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateTodo;
