import React from "react";

import "./style.scss";

const StreamDelete = (props) => {
  return (
    <div className="stream-delete" onClick={props.onClick}>
      <div>Delete Stream</div>
    </div>
  );
}

export default StreamDelete;
