import { combineReducers } from 'redux';
import { submissions } from 'storages/submissions/reducers';
import { auth } from 'storages/auth/reducers';
import { admin } from 'storages/admin/reducers';
import { user } from 'storages/user/reducers';

export default combineReducers({
  auth,
  user,
  admin,
  submissions
});
