import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";

import { fetchStreams } from "../../actions";
import { Link } from "react-router-dom"
import StreamTile from "../../components/Stream_Tile";
import StreamAdd from "../../components/Stream_Add";

import "./style.scss";

class StreamList extends Component {

  componentDidMount() {
    this.props.fetchStreams();
  }

  renderStreamTiles() {
    return _.map(this.props.streams, stream => {
      return (
        <Link to={`/stream/${stream._id}`}>
          <StreamTile
          key={stream._id}
          id={stream._id}
          name={stream.name}
          totalMinutes={stream.totalMinutes}
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
          {this.renderStreamTiles()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    streams: state.streams
  };
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);
