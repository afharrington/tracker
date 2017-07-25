// StreamsView renders the stream tiles and add form
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom"
import _ from "lodash";
import { fetchStreams, updateColor } from "../../actions";

import StreamAdd from "./components/Stream_Add_Container";
import StreamTile from "./components/Stream_Tile";
import EntriesView from "../Entries_View";
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
        <Link to={`/app/${stream._id}`} key={stream._id}>
          <StreamTile
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

  renderMessage() {
    function isEmpty(obj) {
      for (let key in obj) {
        if(obj.hasOwnProperty(key))
          return false;
      }
      return true;
    }

    if (isEmpty(this.props.streams) ) {
      return (
        <div className="streams-message">Add your first tile</div>
      )
    }
  }

  render() {
    return (
      <div className="streams-view">
          {this.renderMessage()}
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
