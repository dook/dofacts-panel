import { all, put } from 'redux-saga/effects';

import { submissionsSagas } from 'storages/submissions/sagas';
import { authSaga } from 'storages/auth/sagas';
import { userSagas } from 'storages/user/sagas';
import { userActions } from 'storages/user/actions';
import { adminSagas } from 'storages/admin/sagas';

import { getToken } from 'utils/token';

function* initialSaga() {
  if (getToken()) {
    yield put(userActions.getUser());
  }
}

export default function* rootSaga() {
  yield all([
    submissionsSagas(),
    authSaga(),
    userSagas(),
    adminSagas(),

    // It has to be the last one
    initialSaga()
  ]);
}
