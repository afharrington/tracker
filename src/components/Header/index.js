import React, { Component } from 'react';
import { Link, Route, Switch, Redirect } from "react-router-dom";
import "./style.scss";
import EntriesView from '../Entries_View';
import StreamsView from '../Streams_View';
import Goodbye from '../Goodbye';
import Login from '../Login';
import Signup from '../Signup';
import { logoutUser } from '../../actions';
import { connect } from "react-redux";

class Header extends Component {

  // If logged in, show a link to the app home (streams) page and log out
  renderLinks() {
    if (this.props.authenticated) {
      return [
        <li key={1}>
          <Link to="/app">Main</Link>
        </li>,
        <li>
          <Link to="/goodbye">Logout</Link>
        </li>
      ];
    // If not logged in, show links to log in or sign up for an account
    } else {
      return [
        <li key={1}>
          <Link to="/login">Log in</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link to="/signup">Sign Up</Link>
        </li>
      ];
    }
  }

  logout() {
    this.props.logoutUser();
  }

  render() {
    return (
      <div className="nav">
        <div className="header-text">
          {this.renderLinks()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, { logoutUser })(Header);
