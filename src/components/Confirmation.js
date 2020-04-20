import React from "react";

import "./Confirmation.css";
import { cancel } from "./Form";

export default ({ setView, titlename, submit, type }) => {
  return (
    <div className="modal" onClick={() => cancel(setView)}>
      <div id="confirmation-ctn" onClick={(e) => e.stopPropagation()}>
        <div id="confirmation-title">{`Want to delete "${titlename}" ?`}</div>
        <button className="ui button" onClick={() => cancel(setView)}>
          Cancel
        </button>
        <button className="ui button" onClick={() => submit(null, type)}>
          Confirm
        </button>
      </div>
    </div>
  );
};
