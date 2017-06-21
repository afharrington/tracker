// entry_list container is fetches data for one skill and renders entry subcomponents
import React, { Component } from 'react';
import _ from "lodash";

import { connect } from "react-redux";
import { fetchEntries } from "../../actions";

import Entry from "../../components/Entry";
import EntryAdd from "../../components/Entry_Add";
import StreamDelete from "../../components/Stream_Delete";
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
  componentDidMount() {
    this.props.fetchEntries();
  }

  renderEntries() {
    // map over the entries object and create an entry component for each

    // TO DO this.props.entries will be FULL list right now, want to iterate over first 10 only
    return _.map(this.props.entries, entry => {
      return (
        <Entry
          key={entry._id}
          id={entry._id}
          hours={entry.hours}
          minutes={entry.minutes}
          content={entry.content}
          date={entry.created_date}
        />
      );
    });
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
  return { entries: state.entries };
}

// connects this component with the fetchEntries action creator
export default connect(mapStateToProps, { fetchEntries })(EntryList);
