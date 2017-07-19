import React from "react";

import "./style.scss";

const StreamAddFormHidden = (props) => {
  return (
    <div className="stream-form-hidden" onClick={props.onClick}>
      <p className="stream-form-plus">+</p>
    </div>
  );
}

export default StreamAddFormHidden;
