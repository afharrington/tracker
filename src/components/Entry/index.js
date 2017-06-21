import React from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEntry } from "../../actions";

import "./style.scss";

class Entry extends React.Component {
  constructor(props) {
    super(props);
  }

  onDeleteClick() {
    this.props.deleteEntry(this.props.id);
  }

  render() {
    return (
      <div className="entry">
        <Moment className="date" format="dddd, MMMM Do YYYY, h:mm a">{this.props.date}</Moment>
        <p className="delete" onClick={this.onDeleteClick.bind(this)}>X</p>
        <div className="entry-content">{this.props.content}</div>
        <div className="time">{this.props.hours} hrs {this.props.minutes} min</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { entries: state.entries };
}

export default connect(mapStateToProps, { deleteEntry })(Entry);
