import React from "react";

import "./Confirmation.css";

export default ({ setView, titlename, submit, type }) => {
  return (
    <div className="modal" onClick={() => setView(["list", null])}>
      <div id="confirmation-ctn" onClick={e => e.stopPropagation()}>
        <div id="confirmation-title">{`Want to delete "${titlename}" ?`}</div>
        <button className="ui button" onClick={() => setView(["list", null])}>
          Cancel
        </button>
        <button className="ui button" onClick={() => submit(null, type)}>
          Confirm
        </button>
      </div>
    </div>
  );
};
