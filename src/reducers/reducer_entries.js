import _ from "lodash";
import { FETCH_ENTRIES, DELETE_ENTRY } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {

    case FETCH_ENTRIES:
      // Commented version turns the array of streams returned into an object with _id values as keys
      // return _.mapKeys(action.payload.data, "_id");
      return {
        entries: action.payload.data,
        totalMinutes: totals(action.payload.data).totalMinutes
      }

    case DELETE_ENTRY:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}

// totals the minutes of all entries in stream
export function totals(entriesArr) {
  const totalMinutes = entriesArr.map((entry)=>{
    return entry.minutes;
  }).reduce((a,b)=>{
    return a + b;
  },0);
  return { totalMinutes }
}
