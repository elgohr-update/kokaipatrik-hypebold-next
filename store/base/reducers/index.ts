import { ActionType, Modal } from '@/store/base/action-types/index';
import { Action } from '@/store/base/actions/index';

const modalReducerInitialState: Modal = {
  name: '',
  toggle: false,
};
const backdropReducerInitialState: boolean = false;

export const modalReducer = (
  state: Modal = modalReducerInitialState,
  action: Action
) => {
  switch (action.type) {
    case ActionType.MODAL_TOGGLE:
      return action.payload;
    default:
      return state;
  }
};

export const backdropReducer = (
  state: boolean = backdropReducerInitialState,
  action: Action
) => {
  switch (action.type) {
    case ActionType.BACKDROP_TOGGLE:
      return action.payload;
    default:
      return state;
  }
};
