import React from "react";
import Moment from "react-moment";
import "./style.scss";

class StreamTile extends React.Component {

  // Renders total minutes (from stream's state) as hours and minutes
  renderTime() {
    let totalMinutes = this.props.totalMinutes;
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;

    return (
      <div className="stream-time">{hours} hrs {minutes} min</div>
    )
  }

  renderLastEntry() {
    let lastEntryText = this.props.lastEntry == "" ?
      <div></div>
    : <p><span className="last-label">LAST:</span><Moment className="stream-time" format="ll">{this.props.lastEntry}</Moment></p>

    return (
      <div className="last-entry">
        {lastEntryText}
      </div>
    )
  }

  render() {
    let tileClassName = `stream-tile color-${Math.floor(this.props.color)}`;

    return (
      <div className={tileClassName}>
        <div className="stream-content">
          <div className="stream-name">{this.props.name}</div>
          {this.renderTime()}
          {this.renderLastEntry()}
        </div>
      </div>
    );
  }
}


export default StreamTile;
