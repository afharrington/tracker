import React from "react";

import "./style.scss";

const StreamAddFormHidden = (props) => {
  return (
    <div className="stream-add-plus" onClick={props.onClick}>
      <div className="stream-plus">+</div>
    </div>
  );
}

export default StreamAddFormHidden;
