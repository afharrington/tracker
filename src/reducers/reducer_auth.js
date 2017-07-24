import { AUTHORIZE_USER, AUTH_ERROR, UNAUTHORIZE_USER } from "../actions";

export default function(state = {}, action) {
  switch(action.type) {
    // User was successful authenticated (removes error if one exists)
    case AUTHORIZE_USER:
      return {...state, error: '', authenticated: true};
    case UNAUTHORIZE_USER:
      return {...state, authenticated: false};
    case AUTH_ERROR:
      return {...state, error: action.payload };
  }
  return state;
}
