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

  // this will fetch ONLY the entries needed for this stream
  componentDidMount() {
    this.props.fetchEntries(this.state.streamId);
  }

  // makes a copy of the current array of entries
  // findIndex returns the index of the first element in array that satisfies the function condition
  // (in this case, the first time the entry's id matches the id argument passed in)
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

  // dispatches the deleteStream action, which will make a DELETE request and
  // reducers will update the streams piece of state
  // user will then be redirected to the main streams page
  deleteStream() {
    this.props.deleteStream(this.state.streamId, () => {
      this.props.history.push("/");
    });
    // this.setState({redirect: true});
  }

  renderTotalMinutes() {
    let totalMinutes = this.props.stream.totalMinutes;
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;

    return (
      <div className="total-time">{hours} hrs {minutes} min</div>
    )
  }

  // map over array of entries, creating an Entry component for each
  renderEntries() {
    const entries = this.props.stream.entries;
    return entries.map((entry) => {
      return (
          <Entry
            key={entry._id}
            content={entry.content}
            minutes={entry.minutes}
            onClick={this.deleteEntry.bind(this, entry._id)}
          />
      );
    });

  }

  // redirect to main streams page if this entire stream is deleted
  render() {
    // const {redirect} = this.state;
    // if (redirect) {
    //   return <Redirect to="/" />
    // }

    // if the stream hasn't loaded yet ...
    const { stream } = this.props;
    if (!stream) {
      return <div>"Loading..."</div>
    }

    return (
      <div>
        <div>{this.renderTotalMinutes()}</div>
        <div className="entry-list-container">
          <EntryAdd streamId={this.state.streamId}/>
          {this.renderEntries()}
          <StreamDelete onClick={this.deleteStream.bind(this)}/>
        </div>
      </div>
    );
  }
}

// allows this component to access JUST its own stream
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

// connects this component with the fetchEntries action creator
export default connect(mapStateToProps, mapDispatchToProps)(EntryList);
