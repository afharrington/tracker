// entry_list container is fetches data for one skill and renders entry subcomponents

// right now, Entry List is fetching directly from the redux store vs. having props passed down
// from StreamList, because I want users to have access to entry data by going to the Stream
// route directly. But check if this is the right way to do this. Not currently using the
// fetchEntries API route.
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import _ from "lodash";

import { connect } from "react-redux";
import { fetchStreams } from "../../actions";

import Entry from "../../components/Entry";
import EntryAdd from "../../components/Entry_Add";
import StreamDelete from "../../components/Stream_Delete";
// need have ability to delete an entry here too
import "./style.scss";

class EntryList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hours: 0,
      minutes: 20
    };
  }

  // once component mounts to DOM, fetchEntries from the database
  componentWillMount() {
    this.props.fetchStreams();
  }

  renderEntries() {
    // need to find a better way to do this using callbacks / Thunk so
    // the component will never receive undefined and I can delete these
    // if statements
    let streamObj = this.props.streams["594af868fba64414c3dc1da2"];
    let entries;
    if (streamObj) {
      entries = streamObj.entries;
    }

    if (entries) {
      return _.map(entries, entry => {
        return (
          <Entry
            key={entry._id}
            id={entry._id}
            minutes={entry.minutes}
            content={entry.content}
            date={entry.created_date}
          />
        );
      });
    }
  }

  render() {
    return (
      <div>
        <div className="total-time">{this.state.hours} hrs {this.state.minutes} min</div>
        <div className="entry-list-container">
          <EntryAdd/>
          {this.renderEntries()}
          <StreamDelete/>
        </div>
      </div>
    );
  }
}

// maps app state to props that can be used in this component as this.props.entries
function mapStateToProps(state) {
  return { streams: state.streams };
}

// connects this component with the fetchEntries action creator
export default connect(mapStateToProps, { fetchStreams })(EntryList);
