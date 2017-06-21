import React from "react";

import "./style.scss";

const StreamAddPlus = (props) => {
  return (
    <div className="stream-add-plus" onClick={props.onClick}>
      <div className="stream-plus">+</div>
    </div>
  );
}

export default StreamAddPlus;
