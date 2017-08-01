import axios from "axios";

export const FETCH_STREAMS = "fetch_streams";
export const CREATE_STREAM = "create_streams";
export const DELETE_STREAM = "delete_stream";
export const UPDATE_COLOR = "update_color";

export const FETCH_ENTRIES = "fetch_entries";
export const CREATE_ENTRY = "create_entry";
export const DELETE_ENTRY = "delete_entry";

export const AUTHORIZE_USER = "authorize_user";
export const UNAUTHORIZE_USER = "unauthorize_user";
export const AUTH_ERROR = "auth_error";

const ROOT_URL = "https://timetilesapi.herokuapp.com";

export function authorizeUser({email, password}, callback) {
  return function(dispatch) {
    // Submits email and password to the server
    axios.post(`${ROOT_URL}/login`, { email, password })
      // If request is successful...
      .then(response => {
        // Update state to indicate user is authenticated
        dispatch({ type: AUTHORIZE_USER });
        localStorage.setItem('token', response.data.token);
      })
      // Callback pushes user to the app route
      .then(() => callback())
      .catch(() => {
        // Send that error to the authError action which will
        // update the auth.error piece of state for use by components
        dispatch(authError("Incorrect email or password"));
      });
  }
}

export function unauthorizeUser() {
  localStorage.removeItem('token');
  return { type: UNAUTHORIZE_USER }
}

export function signupUser({email, password}, callback) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      // If request is successful...
      .then((response) => {
        // Update state to indicate user is authenticated
        dispatch({ type: AUTHORIZE_USER });
        // Save the JWT token
        localStorage.setItem('token', response.data.token);
      })
        // Callback pushes user to the app route
      .then(() => callback())
      // If server returns an error...
      .catch((error) => {
        // Send that error to the authError action which will
        // update the auth.error piece of state for use by components
        if (error.response) {
          dispatch(authError(error.response.data.error));
        }
      });
  }
}

// Get streams for the user by sending the user's token in the header
export function fetchStreams() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
    })
      .then((response) => {
        dispatch({ type: FETCH_STREAMS, payload: response })
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

// Add a stream for the user by sending the user's token in the header
export function createStream(values, callback) {
  return function(dispatch) {
    axios.post(ROOT_URL, values, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
  })
    .then((response) => {
      dispatch({ type: CREATE_STREAM, payload: response })
    })
    .then(() => callback())
    .catch((error) => {
      console.log(error);
    })
  }
}

export function deleteStream(id, callback) {
  const request = axios.delete(`${ROOT_URL}/stream/${id}`, {
    headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
  })
    .then(() => callback());
  return {
    type: DELETE_STREAM,
    payload: id
  }
}

export function updateColor(id, colorValue, callback) {
  const request = axios.put(`${ROOT_URL}/stream/${id}`, colorValue, {
    headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
  })
    .then(() => callback());
  return {
    type: UPDATE_COLOR,
    payload: request
  }
}

export function fetchEntries(streamId) {
  const request = axios.get(`${ROOT_URL}/stream/${streamId}`, {
    headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
  })
  return {
    type: FETCH_ENTRIES,
    payload: request
  };
}


// ENTRIES:
export function createEntry(values, streamId, callback) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/stream/${streamId}`, values, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
    })
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
  const request = axios.delete(`${ROOT_URL}/stream/${streamId}/entry/${entryIndex}`, {
    headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
  })
    .then(() => callback());
  return {
    type: DELETE_ENTRY,
    payload: request
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}
