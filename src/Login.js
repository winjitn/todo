import React, { useState } from "react";
import axios from "axios";

import "./Login.css";

export default ({ setToken }) => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");

  const submit = async e => {
    e.preventDefault();

    axios.interceptors.response.use(
      res => {
        return res;
      },
      error => {
        if (error.response.status === 401) {
        }
        return "error";
      }
    );

    const res = await axios.post(
      "https://candidate.neversitup.com/todo/users/auth",
      loginForm
    );

    if (res === "error") setError("error");
    else setToken(res.data);
  };
  return (
    <div className="ui container">
      <div id="login-ctn">
        <form
          className={`ui form ${error === "" ? "" : "error"}`}
          onSubmit={e => submit(e)}
        >
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              placeholder="username"
              value={loginForm.username}
              onChange={e =>
                setLoginForm({ ...loginForm, username: e.target.value })
              }
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              placeholder="password"
              value={loginForm.password}
              onChange={e =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
            />
          </div>

          <button className="ui button" type="submit">
            Submit
          </button>
          <div className="ui error message">
            <p>Username/password combination not found.</p>
          </div>
        </form>
      </div>
    </div>
  );
};
