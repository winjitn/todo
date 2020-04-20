import React, { useEffect, useState } from "react";

import "./Todo.css";
import Form from "./Form";
import Confirmation from "./Confirmation";

export default () => {
  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem("todos")) || []
  );
  const [view, setView] = useState(["list", null]);

  //update localstorage when state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //handles all submission
  const submit = (formData, type) => {
    if (type === "create") {
      setTodos([...todos, { ...formData, _id: todos.length.toString() }]);
    } else if (type === "delete") {
      const updatedTodos = [...todos].filter((todo) => {
        return todo._id !== view[2];
      });
      setTodos(updatedTodos);
    } else {
      const updatedTodos = [...todos];
      for (let i = 0; i < updatedTodos.length; i++) {
        if (updatedTodos[i]._id === view[1]) {
          updatedTodos[i] = formData;
          break;
        }
      }
      setTodos(updatedTodos);
    }
    setView(["list", null]);
  };

  const modal = (view) => {
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
        const existingForm = todos.find((todo) => todo._id === view[1]);
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
      <div className="ui container">
        <div id="todos" data-testid="todos">
          {todos.map((todo) => (
            <div
              key={todo._id}
              id={todo._id}
              onClick={(e) => setView(["edit", e.currentTarget.id])}
            >
              <div
                className="modal-exit"
                titlename={todo.title}
                id={todo._id}
                onClick={(e) => {
                  e.stopPropagation();
                  setView([
                    "delete",
                    e.currentTarget.getAttribute("titlename"),
                    e.currentTarget.id,
                  ]);
                }}
              >
                &#10005;
              </div>
              <div className="todo-title">{todo.title}</div>
              <div className="todo-desc">{todo.description}</div>
            </div>
          ))}
        </div>
        <div
          id="create-btn"
          data-testid="create"
          onClick={() => setView(["create", null])}
        >
          &#10010;
        </div>
      </div>
      {modal(view)}
    </div>
  );
};
