import { combineReducers } from 'redux';

import { backdropReducer, modalReducer } from '@/store/base/reducers/index';
import { configReducer } from '@/store/config/reducers/index';
import { authReducer } from '@/store/auth/reducers/index';

const reducers =  combineReducers({
  modal: modalReducer,
  backdrop: backdropReducer,
  config: configReducer,
  auth: authReducer,
});

export default reducers;

export type AppState = ReturnType<typeof reducers>;
