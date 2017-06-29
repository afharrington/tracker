import axios from "axios";

export const FETCH_STREAMS = "fetch_streams";
export const CREATE_STREAM = "create_streams";
export const DELETE_STREAM = "delete_stream";

// export const FETCH_ENTRIES = "fetch_entries";
export const CREATE_ENTRY = "create_entry";
export const DELETE_ENTRY = "delete_entry";

const ROOT_URL = "http://localhost:3000";

// STREAMS:

export function fetchStreams() {
  const request = axios.get(`${ROOT_URL}`);
  return {
    type: FETCH_STREAMS,
    payload: request
  };
}

export function createStream(values, callback) {
  const request = axios.post(`${ROOT_URL}`, values)
    .then(() => callback());
  return {
    type: CREATE_STREAM,
    payload: request
  };
}

export function deleteStream(id) {
  const request = axios.delete(`${ROOT_URL}/${id}`);
  return {
    type: DELETE_STREAM,
    payload: id
  }
}

// ENTRIES:

export function fetchEntries() {
  const request = axios.get(`${ROOT_URL}/entries/594af868fba64414c3dc1da2/`);

  return {
    type: FETCH_ENTRIES,
    payload: request
  };
}


export function createEntry(values, callback) {
  const request = axios.post(`${ROOT_URL}/entries`, values)
    .then(() => callback());
  return {
    type: CREATE_ENTRY,
    payload: request
  };
}

export function deleteEntry(id) {
  const request = axios.delete(`${ROOT_URL}/entries/${id}`);
  return {
    type: DELETE_ENTRY,
    payload: id
  }
}
