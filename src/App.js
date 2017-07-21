// Entry point into the app
import React, { Component } from "react";
import { Link, Route } from "react-router-dom";

import Header from './components/Header';
import Welcome from './components/Welcome';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Route exact path="/" component={Welcome}/>
      </div>
    )
  }
}

export default App;
