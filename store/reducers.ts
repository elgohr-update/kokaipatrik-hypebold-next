import { combineReducers } from 'redux';

import { backdropReducer, modalReducer } from '@/store/base/reducers/index';
import { configReducer } from '@/store/config/reducers/index';
import { authReducer } from '@/store/auth/reducers/index';

export default combineReducers({
  modal: modalReducer,
  backdrop: backdropReducer,
  config: configReducer,
  auth: authReducer,
});
