import { ActionType, IAuth } from '@/store/auth/action-types/index';

interface SetAuth {
  type: ActionType.SET_AUTH;
  payload: IAuth;
}

export type Action = SetAuth;
