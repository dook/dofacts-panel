import { combineReducers } from 'redux';

import { apiReducer } from 'base/api/redux';
import { GET_USER, CHANGE_PASSWORD } from './actions';

export const user = combineReducers({
  details: apiReducer(GET_USER),
  passwordChange: apiReducer(CHANGE_PASSWORD)
});
