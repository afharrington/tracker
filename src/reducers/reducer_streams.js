import _ from "lodash";
import { FETCH_STREAMS, DELETE_STREAM, FETCH_ENTRIES, DELETE_ENTRY } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {

    // Turns the array of streams returned into an object with _id values as keys
    case FETCH_STREAMS:
      return {
        streams: _.mapKeys(action.payload.data, "_id")
      }
    case DELETE_STREAM:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
