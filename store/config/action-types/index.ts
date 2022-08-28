export enum ActionType {
  SET_CONFIG = 'setConfig',
}

export interface Categories {
  url: string;
  name: string;
}

export interface Brands {
  url: string;
  name: string;
  description: string;
}

export interface Conditions {
  url: string;
  name: string;
}

export interface Currencies {
  url: string;
  name: string;
  currency: string;
}

export type Data = {
  sizes: any;
  categories: Array<Categories>;
  brands: Array<Brands>;
  conditions: Array<Conditions>;
  currencies: Array<Currencies>;
}

export interface IConfig {
  data: Data;
}
