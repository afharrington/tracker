/// stream_list container is fetches data for one stream and renders stream subcomponents
import React, { Component } from 'react';
import _ from "lodash";

import { connect } from "react-redux";
import { fetchStreams } from "../../actions";

import Stream from "../../components/Stream";
import StreamAdd from "../../components/Stream_Add";
import "./style.scss";

class StreamList extends Component {

  componentDidMount() {
    this.props.fetchStreams();
  }

  renderStreams() {
    // map over the entries object and create an entry component for each
    // TO DO this.props.entries will be FULL list right now, want to iterate over first 10 only
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
        <div className="goal-title">Title</div>
        <div className="stream-list-container">
          <StreamAdd />
          {this.renderStreams()}
        </div>
      </div>
    );
  }
}

// maps app state to props that can be used in this component as this.props.streams,
// which will be iterated over in renderStreams()
function mapStateToProps(state) {
  return { streams: state.streams };
}

// connects this component with the fetchStreams action creator
export default connect(mapStateToProps, { fetchStreams })(StreamList);
