import React, { useEffect, useState } from "react";

import "./Todo.css";
import Form from "./Form";
import Confirmation from "./Confirmation";

export default ({ axios }) => {
  const [todos, setTodos] = useState([]);
  const [view, setView] = useState(["list", null]);

  useEffect(() => {
    (async function fetchData() {
      const res = await axios.get("/todos");
      setTodos(res.data);
    })();
  }, []);

  const submit = async (formData, type) => {
    if (type === "create") {
      const res = await axios.post("/todos", formData);
      setTodos([...todos, res.data]);
    } else if (type === "delete") {
      const res = await axios.delete(`/todos/${view[2]}`);
      const updatedTodos = [...todos].filter(todo => todo._id !== view[2]);
      setTodos(updatedTodos);
    } else {
      const res = await axios.put(`/todos/${view[1]}`, formData);
      const updatedTodos = [...todos];
      for (let i = 0; i < updatedTodos.length; i++) {
        if (updatedTodos[i]._id === view[1]) {
          updatedTodos[i] = res.data;
          break;
        }
      }
      setTodos(updatedTodos);
    }
    setView(["list", null]);
  };

  const modal = view => {
    switch (view[0]) {
      case "list":
        return null;
      case "create":
        return <Form submit={submit} type="create" setView={setView} />;
      case "delete": {
        return (
          <Confirmation
            submit={submit}
            type="delete"
            setView={setView}
            titlename={view[1]}
          />
        );
      }
      case "edit": {
        const existingForm = todos.find(todo => todo._id === view[1]);
        return (
          <Form
            submit={submit}
            type="edit"
            setView={setView}
            existingForm={existingForm}
          />
        );
      }
      default:
        return "";
    }
  };

  return (
    <div>
      {/* <form action="/users/auth" method="post">
        <div>
          <label>Username:</label>
          <input type="text" name="username" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" />
        </div>
        <div>
          <input type="submit" value="Log In" />
        </div>
      </form> */}
      <div className="ui container">
        <div id="todos">
          {todos.map(todo => (
            <div
              key={todo._id}
              id={todo._id}
              onClick={e => setView(["edit", e.currentTarget.id])}
            >
              <div
                className="modal-exit"
                titlename={todo.title}
                id={todo._id}
                onClick={e => {
                  e.stopPropagation();
                  setView([
                    "delete",
                    e.currentTarget.getAttribute("titlename"),
                    e.currentTarget.id
                  ]);
                }}
              >
                &#10005;
              </div>
              <div className="todo-title">{todo.title}</div>
              <div className="todo-desc">{todo.description}</div>
              <div className="todo-date">{todo.updatedAt.slice(0, 10)}</div>
            </div>
          ))}
        </div>
        <div id="create-btn" onClick={() => setView(["create", null])}>
          &#10010;
        </div>
      </div>
      {modal(view)}
    </div>
  );
};
