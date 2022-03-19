import { Dispatch } from 'redux';

import { ActionType, IConfig } from '@/store/config/action-types/index';
import { Action } from '@/store/config/actions/index';

export const setConfig = (value: IConfig) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_CONFIG,
      payload: value,
    });
  };
};
