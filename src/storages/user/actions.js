import { apiAction } from 'base/api/redux';
import { apiUrls } from 'urls';

export const GET_USER = 'GET_USER';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

export const userActions = {
  getUser: () => apiAction(GET_USER, apiUrls.USER.DETAILS),
  changePassword: (payload, afterSagaSuccess) =>
    apiAction(CHANGE_PASSWORD, apiUrls.USER.CHANGE_PASSWORD, {
      method: 'POST',
      payload,
      afterSagaSuccess,
      clearOnRequest: true
    })
};
