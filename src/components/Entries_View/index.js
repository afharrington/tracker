// EntriesView fetches entries for a single stream and renders the components
// for the stream detail page (with total time, form container, and all entries)

import React, { Component } from "react";
import { Link } from "react-router-dom";
import {bindActionCreators} from "redux";
import _ from "lodash";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FontAwesome from "react-fontawesome";

import { connect } from "react-redux";
import { fetchEntries, deleteEntry, deleteStream } from "../../actions";

import EntryAddContainer from "./components/Entry_Add_Container";
import EntryItem from "./components/Entry_Item";

import "../../styles/main.scss";
import "./style.scss";

class EntriesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streamId: this.props.match.params.streamId
    };
  }

  // Fetch this stream's data
  componentDidMount() {
    this.props.fetchEntries(this.state.streamId);
  }

  // Deletes an entry by finding its index in the entries array and passing
  // that index to the deleteEntry action creator
  // When complete, re-fetch entries for the stream for component to re-render
  deleteEntry(_id) {
    const currentEntries = this.props.stream.entries;
    const indexToDelete = currentEntries
      .findIndex(
        function(entry) {
          return entry._id === _id;
        }
      )
    this.props.deleteEntry(this.state.streamId, indexToDelete, () => {
      this.props.fetchEntries(this.state.streamId);
    });
  }

  // Passes the stream's id to the delete_Stream action creator and then
  // redirects user to the StreamsView
  deleteStream() {
    this.props.deleteStream(this.state.streamId, () => {
      this.props.history.push("/");
    });
  }

  // Renders total minutes (from stream's state) as hours and minutes
  renderTotalMinutes() {
    let totalMinutes = this.props.stream.totalMinutes;
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;

    return (
      <div className="total-time">{hours} hr {minutes} min</div>
    )
  }

  // Creates an entry item for each entry in the entries array on stream's state
  renderEntries() {
    const entries = this.props.stream.entries;
    return entries.map((entry) => {
      return (
          <EntryItem
            key={entry._id}
            content={entry.content}
            minutes={entry.minutes}
            onClick={this.deleteEntry.bind(this, entry._id)}
          />
      );
    });

  }

  render() {
    // Checks first if stream is available as props before rendering the component
    const { stream } = this.props;
    if (!stream) {
      return <div>"Loading..."</div>
    }

    return (
      <div className="entries-view">
        <Link className="back" to="/"><FontAwesome name='chevron-circle-left'/></Link>
        <div className="entry-list-container">
          {this.renderTotalMinutes()}
          <div className="entries-container">
            <EntryAddContainer streamId={this.state.streamId}/>
            <ReactCSSTransitionGroup
              transitionName="example"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}>
              {this.renderEntries()}
            </ReactCSSTransitionGroup>
          </div>
          <p className="delete-stream" onClick={this.deleteStream.bind(this)}>DELETE STREAM</p>
        </div>
      </div>
    );
  }
}

// Passes a single stream's data as props to this component
function mapStateToProps(state, ownProps) {
  return {
    stream: state.streams[ownProps.match.params.streamId]
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchEntries,
    deleteEntry,
    deleteStream
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EntriesView);
