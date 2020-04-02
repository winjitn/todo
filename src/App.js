import React, { useState } from "react";

import Axios from "./config/axios";
import Todo from "./Todo";
import Login from "./Login";

export default () => {
  const [token, setToken] = useState("");

  return (
    <>
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <Todo axios={Axios(token.token)} />
      )}
    </>
  );
};
