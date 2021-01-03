import { gql } from "@apollo/client";

const UPDATE_MUTATION = gql`
  mutation UpdateMutation($id: String!, $urgent: Boolean, $completed: Boolean) {
    updateTodo(id: $id, urgent: $urgent, completed: $completed) {
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

const LOGOUT_MUTATION = gql`
  mutation LogoutMutation {
    logout {
      _id
      user
      message
    }
  }
`;

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      _id
      user
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      user
    }
  }
`;

const SEARCH_QUERY = gql`
  query SearchQuery($filter: String!) {
    todoList(filter: $filter) {
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

export {
  UPDATE_MUTATION,
  DELETE_MUTATION,
  CREATE_TODO_MUTATION,
  TODOLIST_QUERY,
  LOGOUT_MUTATION,
  SIGNUP_MUTATION,
  LOGIN_MUTATION,
  SEARCH_QUERY
};
