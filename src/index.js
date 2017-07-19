import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import promise from "redux-promise";
import thunk from "redux-thunk";
import logger from "redux-logger";

import EntriesView from "./components/Entries_View";
import StreamsView from "./components/Streams_View";
import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware(promise, thunk, logger)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      <Switch>
        <Route path="/stream/:streamId" component={EntriesView}/>
        <Route path="/" component={StreamsView}/>
      </Switch>
    </Router>
  </Provider>
  , document.querySelector('.container'));
