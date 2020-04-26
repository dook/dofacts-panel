import { apiAction } from 'base/api/redux';
import { apiUrls } from 'urls';
import { resolveUrl } from 'utils/url';
import { CLEAR } from 'base/redux/consts';

export const CHECKERS_LIST = 'CHECKERS_LIST';
export const EXPERTS_LIST = 'EXPERTS_LIST';
export const USER_ADD = 'USER_ADD';
export const USER_UPDATE = 'USER_UPDATE';
export const INVITATIONS_LIST = 'INVITATIONS_LIST';

export const adminActions = {
  checkers: query => apiAction(CHECKERS_LIST, resolveUrl(apiUrls.ADMIN.CHECKERS_LIST, {}, query)),
  experts: query => apiAction(EXPERTS_LIST, resolveUrl(apiUrls.ADMIN.EXPERTS_LIST, {}, query)),
  addUser: payload => apiAction(USER_ADD, apiUrls.ADMIN.ADD_USER, { method: 'POST', payload, clearOnRequest: true }),
  clearAddUser: () => ({ type: USER_ADD + CLEAR }),
  updateUser: (id, payload) =>
    apiAction(USER_UPDATE, resolveUrl(apiUrls.ADMIN.UPDATE_USER, { id }), {
      method: 'PATCH',
      payload
    }),
  invitations: query => apiAction(INVITATIONS_LIST, resolveUrl(apiUrls.ADMIN.INVITATIONS, {}, query))
};
