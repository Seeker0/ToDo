import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";
import TodoLink from "./TodoLink";

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

const Search = () => {
  const [searchFilter, setSearchFilter] = useState("");

  const [executeSearch, { data }] = useLazyQuery(SEARCH_QUERY);

  return (
    <>
      <div>
        Search
        <input type="text" onChange={e => setSearchFilter(e.target.value)} />
        <button
          onClick={() => executeSearch({ variables: { filter: searchFilter } })}
        >
          OK
        </button>
      </div>

      {data &&
        data.todoList.map((todo, index) => (
          <TodoLink key={todo._id} todo={todo} />
        ))}
    </>
  );
};

export default Search;
