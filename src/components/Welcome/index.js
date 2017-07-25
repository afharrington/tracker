import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import "./style.scss";

class Welcome extends Component {
  render() {
    return (
      <div className="welcome">
        <div className="brand">TimeTiles</div>
        <div className="tagline">Track the time you spend toward your goals</div>
        <Link to="/signup"><div className="signup-link">Sign up</div></Link>
      </div>
    )
  }
}

export default Welcome;
