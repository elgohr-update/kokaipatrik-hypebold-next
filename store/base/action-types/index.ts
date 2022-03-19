export enum ActionType {
  MODAL_TOGGLE = 'modalToggle',
  BACKDROP_TOGGLE = 'backdropToggle',
}

export interface Modal {
  name: string;
  toggle: boolean;
}
