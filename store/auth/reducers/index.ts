import { ActionType, IAuth } from '@/store/auth/action-types/index';
import { Action } from '@/store/auth/actions/index';

const authReducerInitialState: IAuth = {
  token: '',
  data: [],
};

export const authReducer = (
  state: IAuth = authReducerInitialState,
  action: Action
) => {
  switch (action.type) {
    case ActionType.SET_AUTH:
      return action.payload;
    default:
      return state;
  }
};
