import axios from "axios";

export const FETCH_STREAMS = "fetch_streams";
export const CREATE_STREAM = "create_streams";
export const DELETE_STREAM = "delete_stream";

export const FETCH_ENTRIES = "fetch_entries";
export const CREATE_ENTRY = "create_entry";
export const DELETE_ENTRY = "delete_entry";

const ROOT_URL = "http://localhost:3000";

export function fetchStreams() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}`)
      .then(function(response){
        dispatch({type: FETCH_STREAMS, payload: response})
      })
      .catch(function(err) {
        //dispatch({type: FETCH_STREAMS_REJECTED, payload: err})
        console.log(err);
      })
  }
}

export function createStream(values, callback) {
  console.log(values.hours);

  const request = axios.post(`${ROOT_URL}`, values)
    .then(() => callback());
  return {
    type: CREATE_STREAM,
    payload: request
  };
}

export function deleteStream(id) {
  const request = axios.delete(`${ROOT_URL}/stream/${id}`);
  return {
    type: DELETE_STREAM,
    payload: id
  }
}

// ENTRIES:
export function fetchEntries(streamId) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/stream/${streamId}`)
      .then(function(response){
        dispatch({type: FETCH_ENTRIES, payload: response})
      })
      .catch(function(err) {
        // dispatch({type: FETCH_ENTRIES_REJECTED, payload: err})
        console.log(err);
      })
  }
}


export function createEntry(values, streamId, callback) {
  const request = axios.post(`${ROOT_URL}/stream/${streamId}`, values)
    .then(() => callback());
  return {
    type: CREATE_ENTRY,
    payload: request
  };
}


export function deleteEntry(streamId, entryIndex) {
  return function(dispatch) {
    axios.delete(`${ROOT_URL}/stream/${streamId}/entry/${entryIndex}`)
    .then(function(response){
      dispatch({type: DELETE_ENTRY, payload: response})
    })
    .catch(function(err) {
      // dispatch({type: DELETE_ENTRY_REJECTED, payload: err})
      console.log(err);
    })
  }
}
