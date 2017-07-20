// StreamsView fetches all of the streams and renders the add stream form
// (or hidden form) and stream tiles

import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import _ from "lodash";
import { fetchStreams, updateColor } from "../../actions";

import StreamAdd from "./components/Stream_Add_Container";
import StreamTile from "./components/Stream_Tile";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import "../../styles/main.scss";
import "./style.scss";

class StreamsView extends Component {

  componentDidMount() {
    this.props.fetchStreams();
  }

  renderStreamTiles() {
    // If there is at least one entry, passes that date as a prop to the tile,
    // else sends an empty string
    return _.map(this.props.streams, stream => {

      let lastEntry = stream.entries[0] ? stream.entries[0].created_date : "";
      // FOR TESTING let lastEntry = stream.entries[0] ? "Wed Jul 12 2017 16:10:02" : "";

      // For every 2 days since last entry, subtract -1 from color and send PUT request
      // to mongo, then re-fetch all streams
      if (lastEntry !== "") {
        let lastEntryDate = new Date(lastEntry);
        let oneDay = 24*60*60*1000;
        let currentDate = new Date();
        // Checks numbers of days since the last entry
        let daysSince = Math.round(Math.abs((currentDate.getTime() - lastEntryDate.getTime())/(oneDay)));
        if (daysSince >= 2) {
          let numColorValues = Math.floor(daysSince / 2);
          stream.color = stream.color - numColorValues;
          // If the color value becomes negative, set it to 0
          if (stream.color < 0) {
            stream.color = 0;
          }
          // Update the stream in Mongo
          this.props.updateColor(stream._id, { "color": stream.color}, fetchStreams());
        }
      }

      return (
        <Link to={`/stream/${stream._id}`}>
          <StreamTile
            key={stream._id}
            id={stream._id}
            name={stream.name}
            totalMinutes={stream.totalMinutes}
            lastEntry={lastEntry}
            color={stream.color}
          />
        </Link>
      );
    });
  }

  render() {
    return (
      <div className="streams-view">
        {/*}<div className="page-title">Title</div>*/}
        <div className="streams-grid">
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

export default connect(mapStateToProps, { fetchStreams, updateColor })(StreamsView);
