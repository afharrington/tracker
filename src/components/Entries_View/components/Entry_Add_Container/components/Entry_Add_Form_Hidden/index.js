import React from "react";

import "../../../../../../styles/main.scss";
import "./style.scss";

const EntryAddFormHidden = (props) => {
  return (
    <div className="entry-plus">
      <p className="plus" onClick={props.onClick}>+</p>
    </div>
  );
}

export default EntryAddFormHidden;
