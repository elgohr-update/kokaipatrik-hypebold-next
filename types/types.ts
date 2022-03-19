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
  _id: string;
  updatedAt: Date;
  createdAt: Date;
  size: string | ShoesSize;
  categoryId: string;
}

export interface TransformedSizes {
  id: string;
  size: string;
}

export interface Brands {
  _id: string;
  updatedAt: Date;
  createdAt: Date;
  description: string;
  url: string;
  name: string;
}

export interface TransformedBrands {
  id: string;
  name: string;
}

export interface Conditions {
  _id: string;
  updatedAt: Date;
  createdAt: Date;
  url: string;
  name: string;
}

export interface TransformedConditions {
  id: string;
  name: string;
}
