import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import TodoLink from "./TodoLink";
import { SEARCH_QUERY } from "../gqls";

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
