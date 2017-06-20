// entry_list container is fetches data and renders subcomponents

import React, { Component } from 'react';
import _ from "lodash";

import { connect } from "react-redux";
import { fetchEntries } from "../../actions";

import Entry from "../../components/Entry/index.js";
import EntryAdd from "../../components/Entry_Add/index.js";
import "./style.scss";

class EntryList extends Component {

  componentDidMount() {
    this.props.fetchEntries();
  }

  renderEntries() {
    // map over the entries object and create an entry component for each
    return _.map(this.props.entries, entry => {
      return (
        <Entry key={entry.id} content={entry.content} date={entry.created_date}/>
      );
    });
  }

  render() {
    return (
      <div className="entry-list-container">
        <EntryAdd/>
        {this.renderEntries()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { entries: state.entries };
}

export default connect(mapStateToProps, { fetchEntries })(EntryList);
