import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import promise from "redux-promise";
import thunk from "redux-thunk";
import logger from "redux-logger";

import App from './App';
import Welcome from './components/Welcome';
import EntriesView from "./components/Entries_View";
import StreamsView from "./components/Streams_View";
import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore);

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={createStoreWithMiddleware(reducers)}>
      <Router>
        <App />
      </Router>
    </Provider>
  </MuiThemeProvider>
  , document.querySelector('.container'));
