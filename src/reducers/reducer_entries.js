import _ from "lodash";
import { FETCH_ENTRIES, DELETE_ENTRY } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    // Turns the array of entries returned into an object with _id values as keys
    case FETCH_ENTRIES:
      return _.mapKeys(action.payload.data, "_id");
    case DELETE_ENTRY:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
