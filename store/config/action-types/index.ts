export enum ActionType {
  SET_CONFIG = 'setConfig',
}

export type ShoesSize = {
  us: Number;
  uk: Number;
  eu: Number;
}

export interface Sizes {
  size: string | ShoesSize;
  categoryUrl: string;
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

export interface Deliveries {
  name: string;
  url: string;
  description: string;
}

export type Data = {
  sizes: Array<Sizes>;
  categories: Array<Categories>;
  brands: Array<Brands>;
  conditions: Array<Conditions>;
  currencies: Array<Currencies>;
  deliveries: Array<Deliveries>;
}

export interface IConfig {
  data: Data;
}
