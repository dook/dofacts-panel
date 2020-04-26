import { combineReducers } from 'redux';
import { apiReducer } from 'base/api/redux';

import {
  SUBMISSIONS_LIST,
  SUBMISSIONS_HISTORY,
  SUBMISSIONS_DETAILS,
  VERIFY_SUBMISSION,
  SUBMISSIONS_REMOVE,
  KEYWORDS_LIST,
  KEYWORDS_ADD,
  KEYWORDS_REMOVE
} from './actions';
import { SUCCESS } from 'base/redux/consts';

const extendList = {
  [KEYWORDS_ADD + SUCCESS]: (state, action) => ({
    ...state,
    data: {
      ...state.data,
      results: [...state.data.results, action.data]
    }
  }),
  [KEYWORDS_REMOVE + SUCCESS]: (state, action) => ({
    ...state,
    data: {
      ...state.data,
      results: state.data.results.filter(item => item.id !== action.data.id)
    }
  })
};

export const submissions = combineReducers({
  list: apiReducer(SUBMISSIONS_LIST),
  history: apiReducer(SUBMISSIONS_HISTORY),
  details: apiReducer(SUBMISSIONS_DETAILS),
  remove: apiReducer(SUBMISSIONS_REMOVE),
  verify: apiReducer(VERIFY_SUBMISSION),
  keywords: combineReducers({
    list: apiReducer(KEYWORDS_LIST, extendList),
    add: apiReducer(KEYWORDS_ADD),
    remove: apiReducer(KEYWORDS_REMOVE)
  })
});
