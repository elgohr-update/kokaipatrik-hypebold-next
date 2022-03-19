import { Dispatch } from 'redux';

import { ActionType, IAuth } from '@/store/auth/action-types/index';
import { Action } from '@/store/auth/actions/index';

export const setAuth = (value: IAuth) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_AUTH,
      payload: value,
    });
  };
};
