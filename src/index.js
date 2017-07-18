import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import promise from "redux-promise";
import thunk from "redux-thunk";
import logger from "redux-logger";

import EntryList from "./containers/Entry_List/index.js";
import StreamList from "./containers/Stream_List/index.js";
import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware(promise, thunk, logger)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      <Switch>
        <Route path="/stream/:streamId" component={EntryList}/>
        <Route path="/" component={StreamList}/>
      </Switch>
    </Router>
  </Provider>
  , document.querySelector('.container'));
