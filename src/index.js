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

import { AUTHORIZE_USER } from './actions';
import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore);

// Creates Redux store in advance of rendering
const store = createStoreWithMiddleware(reducers);

// Looks for a token in browser local storage, updating the auth state
// if it exists
const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: AUTHORIZE_USER });
}

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </MuiThemeProvider>
  , document.querySelector('.container'));
