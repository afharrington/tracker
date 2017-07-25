import { SET_USER, AUTHORIZE_USER, UNAUTHORIZE_USER, AUTH_ERROR } from "../actions";

export default function(state = {}, action) {
  switch(action.type) {
    // case SET_USER:
    //   return {...state, user: action.payload };

    // Sets authenticated to true or false, does not require a payload
    case AUTHORIZE_USER:
      return {...state, error: '', authenticated: true };
    case UNAUTHORIZE_USER:
      return {...state, authenticated: false };
    case AUTH_ERROR:
      return {...state, error: action.payload };
  }
  return state;
}
