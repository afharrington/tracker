import _ from "lodash";
import { FETCH_STREAMS, DELETE_STREAM } from "../actions";

// Turns the array of streams returned into an object with _id values as keys
export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_STREAMS:
      return _.mapKeys(action.payload.data, "_id");
    case DELETE_STREAM:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
