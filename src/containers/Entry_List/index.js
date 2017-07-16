// Shows list of all entries + delete button for the entire stream

import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import {bindActionCreators} from "redux";
import _ from "lodash";

import { connect } from "react-redux";
import { fetchEntries, deleteEntry, deleteStream } from "../../actions";

import Entry from "../../components/Entry";
import EntryAdd from "../../components/Entry_Add";
import StreamDelete from "../../components/Stream_Delete";

import "./style.scss";

class EntryList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hours: 0,
      minutes: 20,
      streamId: this.props.match.params.streamId,
      redirect: false
    };
  }

  // fetchEntries action makes a GET request and when resolved, dispatches the response
  // to the entries reducer, whose state can be accessed here with this.props.entries
  componentWillMount() {
    this.props.fetchEntries(this.state.streamId);
  }

  // this will be called if entries are added or deleted
  componentDidUpdate() {
    this.props.fetchEntries(this.state.streamId);
  }

  // makes a copy of the current array of entries
  // findIndex returns the index of the first element in array that satisfies the function condition
  // (in this case, the first time the entry's id matches the id argument passed in)
  deleteEntry(_id) {
    const currentEntries = this.props.entries;
    const indexToDelete = currentEntries
      .findIndex(
        function(entry) {
          return entry._id === _id;
        }
      )
    this.props.deleteEntry(this.state.streamId, indexToDelete);

  }

  // dispatches the deleteStream action, which will make a DELETE request and
  // reducers will update the streams piece of state
  // user will then be redirected to the main streams page
  deleteStream() {
    this.props.deleteStream(this.state.streamId);
    this.setState({redirect: true});
  }

  renderTotalMinutes() {
    let totalMinutes = this.props.totalMinutes;
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;

    return (
      <div className="total-time">{hours} hrs {minutes} min</div>
    )
  }

  renderEntries() {
      return _.map(this.props.entries, entry => {
        return (
          <Entry
          key={entry._id}
          id={entry._id}
          content={entry.content}
          hours={entry.hours}
          minutes={entry.minutes}
          onClick={this.deleteEntry.bind(this, entry._id)}
          />
        );
      });
    }

  // redirect to main streams page if this entire stream is deleted
  render() {
    const {redirect} = this.state;
    if (redirect) {
      return <Redirect to="/" />
    }

    return (
      <div>
        {this.renderTotalMinutes()}
        <div className="entry-list-container">
          <EntryAdd streamId={this.state.streamId}/>
          {this.renderEntries()}
          <StreamDelete onClick={this.deleteStream.bind(this)}/>
        </div>
      </div>
    );
  }
}

// maps app state to props that can be used in this component as this.props.entries
function mapStateToProps(state) {
  return {
    entries: state.entries.entries,
    totalMinutes: state.entries.totalMinutes
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchEntries,
    deleteEntry,
    deleteStream
  }, dispatch)
}

// connects this component with the fetchEntries action creator
export default connect(mapStateToProps, mapDispatchToProps)(EntryList);
