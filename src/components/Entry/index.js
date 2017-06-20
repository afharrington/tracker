import React from "react";
import Moment from "react-moment";

import "./style.scss";

const Entry = (props) => {
  return (
    <div className="entry">
      <Moment className="time" format="dddd, MMMM Do YYYY, h:mm a">{props.date}</Moment>
      {props.content}
    </div>
  );
}

export default Entry;
