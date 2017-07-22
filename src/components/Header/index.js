import React, { Component } from 'react';
import { Link, Route, Switch } from "react-router-dom";
import "./style.scss";
import EntriesView from '../Entries_View';
import StreamsView from '../Streams_View';

class Header extends Component {

  render() {
    return (
      <div className="nav">
        <div className="header-text">
          <Link to="/app"><li>Streams</li></Link>
          <Link to="#"><li>Log in</li></Link>
          <Link to="#"><li>Log out</li></Link>
          <Link to="#"><li>Sign up</li></Link>
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
