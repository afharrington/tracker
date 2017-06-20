import _ from "lodash";
import { FETCH_ENTRIES } from "../actions";

// turn array of entries into an object with the _id property as the key
export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_ENTRIES:
      return _.mapKeys(action.payload.data, "_id");
      // return action.payload.data
    default:
      return state;
  }
}
