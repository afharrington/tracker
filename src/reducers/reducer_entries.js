import _ from "lodash";
import { FETCH_ENTRIES, DELETE_ENTRY } from "../actions";

// turn array of entries into an object with the _id property as the key
export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_ENTRIES:
      return _.mapKeys(action.payload.data, "_id");
    case DELETE_ENTRY:
      // if key exists on app state, return new state without it
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
