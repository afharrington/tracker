import React from "react";

import "./style.scss";

const EntryAddPlus = (props) => {
  return (
    <div className="entry-plus" onClick={props.onClick}>
      <div className="plus">+</div>
    </div>
  );
}

export default EntryAddPlus;
