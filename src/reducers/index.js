import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import EntriesReducer from "./reducer_entries";

const rootReducer = combineReducers({
  entries: EntriesReducer,
  form: formReducer
});

export default rootReducer;
