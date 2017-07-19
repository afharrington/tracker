import axios from "axios";

export const FETCH_STREAMS = "fetch_streams";
export const CREATE_STREAM = "create_streams";
export const DELETE_STREAM = "delete_stream";
export const UPDATE_COLOR = "update_color";

export const FETCH_ENTRIES = "fetch_entries";
export const CREATE_ENTRY = "create_entry";
export const DELETE_ENTRY = "delete_entry";

const ROOT_URL = "http://localhost:3000";

export function fetchStreams() {
  const request = axios.get(`${ROOT_URL}`)
    return {
      type: FETCH_STREAMS,
      payload: request
    }
}

export function createStream(values, callback) {
  const request = axios.post(`${ROOT_URL}`, values)
    .then(() => callback());
  return {
    type: CREATE_STREAM,
    payload: request
  };
}

export function deleteStream(id, callback) {
  const request = axios.delete(`${ROOT_URL}/stream/${id}`)
    .then(() => callback());
  return {
    type: DELETE_STREAM,
    payload: id
  }
}

export function updateColor(id, colorValue, callback) {
  const request = axios.put(`${ROOT_URL}/stream/${id}`, colorValue)
    .then(() => callback());
  return {
    type: UPDATE_COLOR,
    payload: request
  }
}

export function fetchEntries(streamId) {
  const request = axios.get(`${ROOT_URL}/stream/${streamId}`)
  return {
    type: FETCH_ENTRIES,
    payload: request
  };
}


// ENTRIES:
export function createEntry(values, streamId, callback) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/stream/${streamId}`, values)
      .then(function(response){
        dispatch({type: CREATE_ENTRY, payload: response});
      })
      .then(() => callback())
      .catch(function(err) {
        // dispatch({type: FETCH_ENTRIES_REJECTED, payload: err})
        console.log(err);
      })
  }
}

export function deleteEntry(streamId, entryIndex, callback) {
  const request = axios.delete(`${ROOT_URL}/stream/${streamId}/entry/${entryIndex}`)
    .then(() => callback());
  return {
    type: DELETE_ENTRY,
    payload: request
  };
}
