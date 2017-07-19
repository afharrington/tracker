import React from "react";
import "./style.scss";

class StreamTile extends React.Component {

  render() {
    return (
      <div className="stream-tile">
        <div className="stream-name">{this.props.name}</div>
        <div>{this.props.totalMinutes}</div>
      </div>
    );
  }
}


export default StreamTile;
