import { ActionType, IConfig } from '@/store/config/action-types/index';

interface SetConfig {
  type: ActionType.SET_CONFIG;
  payload: IConfig;
}

export type Action = SetConfig;
