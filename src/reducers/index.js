import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import StreamsReducer from "./reducer_streams";
import EntriesReducer from "./reducer_entries";

const rootReducer = combineReducers({
  streams: StreamsReducer,
  entries: EntriesReducer,
  form: formReducer
});

export default rootReducer;
