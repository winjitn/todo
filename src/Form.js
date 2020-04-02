import React, { useState } from "react";

import "./Form.css";

const validate = (formData, e, setError, { submit, type }) => {
  e.preventDefault();

  const { title, description } = formData;

  if (title === "" && description === "")
    setError("Title and description cannot be empty");
  else if (title === "") setError("Title cannot be empty");
  else if (description === "") setError("Description cannot be empty");
  else {
    setError("");
    e.currentTarget.classList.add("loading");
    submit(formData, type);
  }
};

const cancel = (setView, e) => {
  e.preventDefault();
  setView(["list", null]);
};

export default props => {
  const { existingForm } = props;

  const [formData, setFormData] = useState({
    title: existingForm ? existingForm.title : "",
    description: existingForm ? existingForm.description : ""
  });
  const [error, setError] = useState("");

  return (
    <div className="modal" onClick={() => props.setView(["list", null])}>
      <div className="ui container">
        <div id="form-ctn" onClick={e => e.stopPropagation()}>
          <div
            className="modal-exit"
            onClick={() => props.setView(["list", null])}
          >
            &#10005;
          </div>
          <form
            className={`ui form ${error === "" ? "" : "error"}`}
            onSubmit={e => validate(formData, e, setError, props)}
          >
            <div className="field">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={e =>
                  setFormData({ ...formData, title: e.currentTarget.value })
                }
              />
            </div>
            <div className="field">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={e =>
                  setFormData({
                    ...formData,
                    description: e.currentTarget.value
                  })
                }
              />
            </div>
            <button
              className="ui button"
              onClick={e => cancel(props.setView, e)}
            >
              Cancel
            </button>
            <button className="ui button" type="submit">
              {props.type === "create" ? "Create" : "Edit"}
            </button>
            <div className="ui error message">
              <p>{error}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
