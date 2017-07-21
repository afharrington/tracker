import React, { Component } from 'react';
import { Link, Route, Switch } from "react-router-dom";
import "./style.scss";
import EntriesView from '../Entries_View';
import StreamsView from '../Streams_View';


class Header extends Component {
  render() {
    return (
      <div>
        <div>
          <h1>Header!</h1>
          <Link to="/app">Go to Streams View</Link>
        </div>
        <Switch>
          <Route path="/app/:streamId" component={EntriesView}/>
          <Route exact path="/app" component={StreamsView}/>
        </Switch>
      </div>
    )
  }
}

export default Header;
