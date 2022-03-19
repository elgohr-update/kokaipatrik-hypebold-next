import { ActionType, Modal } from '@/store/base/action-types/index';

interface ModalToggle {
  type: ActionType.MODAL_TOGGLE;
  payload: Modal;
}

interface BackdropToggle {
  type: ActionType.BACKDROP_TOGGLE;
  payload: boolean;
}

export type Action = ModalToggle | BackdropToggle;
