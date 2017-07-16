/// Fetches list of all streams and renders them as Stream components
import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";

import { fetchStreams } from "../../actions";
import { Link } from "react-router-dom"
import Stream from "../../components/Stream";
import StreamAdd from "../../components/Stream_Add";

import "./style.scss";

class StreamList extends Component {

  componentWillMount() {
    this.props.fetchStreams();
  }

  // this will be called if stream is deleted in Entry_List component and user
  // is redirected to this page
  componentDidUpdate(){
    this.props.fetchStreams();
  }

  // Creates a stream tile for each stream in the list
  renderStreams() {
    return _.map(this.props.streams, stream => {
      let streamId = stream._id;
      return (
        <Link to={`/stream/${streamId}`}>
          <Stream
            key={streamId}
            id={streamId}
            name={stream.name}
          />
        </Link>
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
  return {
    streams: state.streams.streams
  };
}

// Connects this component with fetchStreams action creator
export default connect(mapStateToProps, { fetchStreams })(StreamList);
