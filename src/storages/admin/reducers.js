import { combineReducers } from 'redux';
import { apiReducer } from 'base/api/redux';

import { EXPERTS_LIST, CHECKERS_LIST, USER_ADD, USER_UPDATE, INVITATIONS_LIST } from './actions';

export const admin = combineReducers({
  checkers: apiReducer(CHECKERS_LIST),
  experts: apiReducer(EXPERTS_LIST),
  add: apiReducer(USER_ADD),
  update: apiReducer(USER_UPDATE),
  invitations: apiReducer(INVITATIONS_LIST)
});
