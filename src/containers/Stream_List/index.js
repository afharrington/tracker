/// Fetches list of all streams and renders them as Stream components
import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";

import { fetchStreams } from "../../actions";

import Stream from "../../components/Stream";
import StreamAdd from "../../components/Stream_Add";

import "./style.scss";

class StreamList extends Component {

  componentWillMount() {
    this.props.fetchStreams();
  }

  // Creates a stream tile for each stream in the list
  renderStreams() {
    return _.map(this.props.streams, stream => {
      return (
        <Stream
          key={stream._id}
          id={stream._id}
          name={stream.name}
          minutes={stream.minutes}
        />
      );
    });
  }

  render() {
    return (
      <div className="stream-list-container">
        <div className="page-title">Title</div>
        <div className="stream-list-container">
          <StreamAdd />
          {this.renderStreams()}
        </div>
      </div>
    );
  }
}

// Connects this component to the Redux store
function mapStateToProps(state) {
  return { streams: state.streams };
}

// Connects this component with fetchStreams action creator
export default connect(mapStateToProps, { fetchStreams })(StreamList);
