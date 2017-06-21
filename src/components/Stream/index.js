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
        <div className="stream-minutes">{this.props.minutes}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { streams: state.streams };
}

export default connect(mapStateToProps)(Stream);
