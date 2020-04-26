import { all } from 'redux-saga/effects';

import { apiSaga } from 'base/api/redux';
import {
  SUBMISSIONS_LIST,
  SUBMISSIONS_HISTORY,
  SUBMISSIONS_DETAILS,
  VERIFY_SUBMISSION,
  SUBMISSIONS_HISTORY_DETAILS,
  SUBMISSIONS_REMOVE,
  KEYWORDS_LIST,
  KEYWORDS_ADD,
  KEYWORDS_REMOVE
} from './actions';

export function* submissionsSagas() {
  yield all([
    apiSaga(SUBMISSIONS_LIST)(),
    apiSaga(SUBMISSIONS_HISTORY)(),
    apiSaga(SUBMISSIONS_DETAILS)(),
    apiSaga(SUBMISSIONS_REMOVE)(),
    apiSaga(VERIFY_SUBMISSION)(),
    apiSaga(SUBMISSIONS_HISTORY_DETAILS)(),
    apiSaga(KEYWORDS_LIST)(),
    apiSaga(KEYWORDS_ADD)(),
    apiSaga(KEYWORDS_REMOVE)()
  ]);
}
