import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import StreamsReducer from "./reducer_streams";

const rootReducer = combineReducers({
  streams: StreamsReducer,
  form: formReducer
});

export default rootReducer;
