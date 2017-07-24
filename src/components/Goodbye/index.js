import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { logoutUser } from '../../actions';
import { connect } from "react-redux";

import "./style.scss";

class Goodbye extends Component {

  componentWillMount() {
    this.props.logoutUser();
  }

  render() {
    return (
      <div>
        Bye!
    </div>
    )
  }
}

export default connect(null, { logoutUser })(Goodbye);
