import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import "./style.scss";

class Welcome extends Component {
  render() {
    return (
      <div className="welcome">
        <div>
          Welcome! This landing page is shown to all visitors.
          <Link to="/signup">Sign up for a free account</Link>
        </div>
      </div>
    )
  }
}

export default Welcome;
