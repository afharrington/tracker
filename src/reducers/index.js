import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import StreamsReducer from './reducer_streams';
import AuthReducer from './reducer_auth';

const rootReducer = combineReducers({
  streams: StreamsReducer,
  auth: AuthReducer,
  form: formReducer
});

export default rootReducer;
