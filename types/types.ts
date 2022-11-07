export interface Categories {
  _id: string;
  updatedAt: Date;
  createdAt: Date;
  name: string;
  url: string;
}

export interface TransformedCategories {
  id: string;
  name: string;
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

export interface TransformedSizes {
  id: string;
  size: string;
}

export interface Brands {
  name: string;
  url: string;
  description: string;
}

export interface TransformedBrands {
  id: string;
  name: string;
}

export interface Conditions {
  name: string;
  url: string;
}

export interface TransformedConditions {
  id: string;
  name: string;
}
