import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { TODOLIST_QUERY, CREATE_TODO_MUTATION } from "../gqls";

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
    update: (cache, { data: { addTodo } }) => {
      const data = cache.readQuery({
        query: TODOLIST_QUERY
      });

      cache.writeQuery({
        query: TODOLIST_QUERY,
        data: {
          todoList: [addTodo, ...data.todoList]
        }
      });
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
          placeholder="Complete by Date mm/dd/yy"
        />

        <label>Urgent Task?</label>

        <div className="form-check">
          <label>
            <input
              className="form-check-input"
              type="checkbox"
              onChange={e => {
                setFormState({ ...formState, urgent: !formState.urgent });
              }}
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
