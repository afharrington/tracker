import _ from "lodash";
import { FETCH_STREAMS, DELETE_STREAM } from "../actions";

// turn array of skills into an object with the _id property as the key
export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_STREAMS:
      return _.mapKeys(action.payload.data, "_id");
    case DELETE_STREAM:
      // if key exists on app state, return new state without it
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
