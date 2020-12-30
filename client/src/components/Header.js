import React from "react";
import { useHistory } from "react-router";
import { Link, withRouter } from "react-router-dom";

const Header = () => {
  const history = useHistory();
  const token = localStorage.getItem("token");

  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex flex-fixed black">
        <div className="fw7 mr1">Todo List</div>
        <Link to="/" className="ml1 no-underline black">
          todos
        </Link>

        <div className="ml1">|</div>
        <Link to="/create" className="ml1 no-underline black">
          add
        </Link>
      </div>

      <div className="flex flex-fixed">
        {token && (
          <div
            className="ml1 pointer black"
            onClick={() => {
              localStorage.removeItem("token");
              history.push(`/`);
            }}
          >
            logout
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
