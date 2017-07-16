import React from "react";
import { connect } from "react-redux";

import "./style.scss";

class Stream extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="stream-tile">
        <div className="stream-name">{this.props.name}</div>
        <div className="stream-minutes">{this.props.totalMinutes}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { totalMinutes: state.entries.totalMinutes };
}

export default connect(mapStateToProps)(Stream);
