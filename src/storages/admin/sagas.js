import { all } from 'redux-saga/effects';

import { apiSaga } from 'base/api/redux';
import { EXPERTS_LIST, CHECKERS_LIST, USER_ADD, USER_UPDATE, INVITATIONS_LIST } from './actions';

export function* adminSagas() {
  yield all([
    apiSaga(CHECKERS_LIST)(),
    apiSaga(EXPERTS_LIST)(),
    apiSaga(USER_ADD)(),
    apiSaga(USER_UPDATE)(),
    apiSaga(INVITATIONS_LIST)()
  ]);
}
