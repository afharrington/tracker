import _ from "lodash";
import { FETCH_STREAMS, DELETE_STREAM, FETCH_ENTRIES, DELETE_ENTRY } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {

    // Turns the array of streams returned into an object with _id values as keys
    case FETCH_STREAMS:
      return _.mapKeys(action.payload.data, '_id');
    case DELETE_STREAM:
      return _.omit(state, action.payload);
    case FETCH_ENTRIES:
      // action.payload is the particular stream object, including its entries property
      // this takes the entire streams state and concatenates it with this stream object, making
      // its id the key
      return {...state, [action.payload.data._id]: action.payload.data};
    case DELETE_ENTRY:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
