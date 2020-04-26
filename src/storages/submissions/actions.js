import { put } from 'redux-saga/effects';
import { apiUrls } from 'urls';
import { apiAction } from 'base/api/redux';
import { CLEAR } from 'base/redux/consts';
import { resolveUrl } from 'utils/url';
import { rolesTypes } from 'consts';

export const SUBMISSIONS_LIST = 'SUBMISSIONS_LIST';
export const SUBMISSIONS_HISTORY = 'SUBMISSIONS_HISTORY';
export const SUBMISSIONS_HISTORY_DETAILS = 'SUBMISSIONS_HISTORY_DETAILS';
export const SUBMISSIONS_DETAILS = 'SUBMISSIONS_DETAILS';
export const SUBMISSIONS_REMOVE = 'SUBMISSIONS_REMOVE';
export const VERIFY_SUBMISSION = 'VERIFY_SUBMISSION';

export const KEYWORDS_LIST = 'KEYWORDS_LIST';
export const KEYWORDS_ADD = 'KEYWORDS_ADD';
export const KEYWORDS_REMOVE = 'KEYWORDS_REMOVE';

export const submissionsActions = {
  list: role => query => apiAction(SUBMISSIONS_LIST, resolveUrl(apiUrls.SUBMISSIONS[role].LIST, {}, query)),
  details: role => id =>
    apiAction(SUBMISSIONS_DETAILS, resolveUrl(apiUrls.SUBMISSIONS[role].DETAILS, { id }), {
      clearOnRequest: true,
      afterSagaSuccess: function*() {
        yield put({ type: VERIFY_SUBMISSION + CLEAR });
      }
    }),
  verify: role => (id, payload, options = {}) =>
    apiAction(VERIFY_SUBMISSION, resolveUrl(apiUrls.SUBMISSIONS[role].VERIFY, { id }), {
      ...options,
      payload,
      method: 'POST',
      extendResponse: { id }
    }),
  history: {
    list: query => apiAction(SUBMISSIONS_HISTORY, resolveUrl(apiUrls.SUBMISSIONS.HISTORY.LIST, {}, query)),
    details: id =>
      apiAction(SUBMISSIONS_DETAILS, resolveUrl(apiUrls.SUBMISSIONS.HISTORY.DETAILS, { id }), {
        clearOnRequest: true
      })
  },
  remove: (id, payload = true) =>
    apiAction(SUBMISSIONS_REMOVE, resolveUrl(apiUrls.SUBMISSIONS[rolesTypes.ADMIN].DETAILS, { id }), {
      method: 'PATCH',
      payload: {
        deleted: payload
      },
      afterSagaSuccess: function*() {
        yield put(submissionsActions.details(rolesTypes.ADMIN)(id));
      }
    }),
  keywords: {
    list: () => apiAction(KEYWORDS_LIST, resolveUrl(apiUrls.ADMIN.KEYWORDS, {}, { page_size: 200 })),
    add: (payload, resetForm) =>
      apiAction(KEYWORDS_ADD, apiUrls.ADMIN.KEYWORDS, {
        method: 'POST',
        payload,
        afterSagaSuccess: resetForm,
        clearOnRequest: true
      }),
    remove: id =>
      apiAction(KEYWORDS_REMOVE, resolveUrl(apiUrls.ADMIN.KEYWORDS_DETAILS, { id }), {
        method: 'DELETE',
        extendResponse: { id },
        clearOnRequest: true
      })
  }
};
