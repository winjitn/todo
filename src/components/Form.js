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

export const cancel = (setView) => {
  setView(["list", null]);
};

export default (props) => {
  const { existingForm } = props;

  const [formData, setFormData] = useState({
    title: existingForm ? existingForm.title : "",
    description: existingForm ? existingForm.description : "",
    _id: existingForm ? existingForm._id : "",
  });
  const [error, setError] = useState("");

  return (
    <div className="modal" onClick={() => cancel(props.setView)}>
      <div className="ui container">
        <div
          id="form-ctn"
          data-testid="form"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-exit" onClick={() => cancel(props.setView)}>
            &#10005;
          </div>
          <form
            className={`ui form ${error === "" ? "" : "error"}`}
            onSubmit={(e) => validate(formData, e, setError, props)}
          >
            {["title", "description"].map((field) => {
              let fieldProps = {
                type: "text",
                name: field,
                value: formData[field],
                placeholder: field,
                onChange: (e) =>
                  setFormData({
                    ...formData,
                    [field]: e.currentTarget.value,
                  }),
              };
              return (
                <div className="field" key={field}>
                  <label>{field === "title" ? "Title" : "Description"}</label>
                  {field === "title" ? (
                    <input {...fieldProps} />
                  ) : (
                    <textarea {...fieldProps} />
                  )}
                </div>
              );
            })}
            <button className="ui button" onClick={() => cancel(props.setView)}>
              Cancel
            </button>
            <button data-testid="submit" className="ui button" type="submit">
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
