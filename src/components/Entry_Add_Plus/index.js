import React from "react";

import "./style.scss";

const EntryAddPlus = (props) => {
  return (
    <div className="entry-plus" onClick={props.onClick}>
      <p className="plus">+</p>
    </div>
  );
}

export default EntryAddPlus;
