import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./style.scss";

class Entry extends React.Component {
  constructor(props) {
    super(props);
  }

  // receive minutes from state, convert to hours and minutes to display
  renderTime() {
    let totalMinutes = this.props.minutes;
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;

    return (
      <div className="time">{hours} hrs {minutes} min</div>
    )
  }

  render() {
    return (
        <div className="entry">
          <Moment className="date" format="dddd, MMMM Do YYYY, h:mm a">{this.props.date}</Moment>
          <p className="delete" onClick={this.props.onClick.bind(this)}>X</p>
          <div className="entry-content">{this.props.content}</div>
          {this.renderTime()}
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    entries: state.entries
  };
}

export default connect(mapStateToProps)(Entry);
