import { Dispatch } from 'redux';

import { ActionType, Modal } from '@/store/base/action-types/index';
import { Action } from '@/store/base/actions/index';

export const modalToggle = (value: Modal) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.MODAL_TOGGLE,
      payload: value,
    });
  };
};

export const backdropToggle = (value: boolean) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BACKDROP_TOGGLE,
      payload: value,
    });
  };
};
