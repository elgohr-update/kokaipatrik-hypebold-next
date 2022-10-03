import { ActionType, IConfig } from '@/store/config/action-types/index';
import { Action } from '@/store/config/actions/index';

const configReducerInitialState: IConfig = {
  data: {
    sizes: [],
    categories: [],
    brands: [],
    conditions: [],
    currencies: [],
    deliveries: [],
  }
};

export const configReducer = (
  state: IConfig = configReducerInitialState,
  action: Action
) => {
  switch (action.type) {
    case ActionType.SET_CONFIG:
      return action.payload;
    default:
      return state;
  }
};
