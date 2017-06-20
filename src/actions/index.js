import axios from "axios";

export const FETCH_ENTRIES = "fetch_entries";
export const CREATE_ENTRY = "create_entry";

const ROOT_URL = "http://localhost:3000";

export function fetchEntries() {
  const request = axios.get(`${ROOT_URL}/entries`);

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
