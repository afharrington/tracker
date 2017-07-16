import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch, browserHistory } from "react-router-dom";
import promise from "redux-promise";
import thunk from "redux-thunk";

import EntryList from "./containers/Entry_List/index.js";
import StreamList from "./containers/Stream_List/index.js";

import reducers from "./reducers";

// creates redux store to hold app state
// check reducers to see state elements
const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/stream/:streamId" component={EntryList}/>
          <Route path="/" component={StreamList}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
