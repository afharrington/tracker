import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import EntriesReducer from "./reducer_entries";
import StreamsReducer from "./reducer_streams";

const rootReducer = combineReducers({
  entries: EntriesReducer,
  streams: StreamsReducer,
  form: formReducer
});

export default rootReducer;
