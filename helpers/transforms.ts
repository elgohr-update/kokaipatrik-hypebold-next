import {
  Conditions,
  TransformedConditions,
  Sizes,
  TransformedSizes,
  Brands,
  TransformedBrands,
} from '@/types/types';

export const transformBrands = (brands: Array<Brands>): Array<TransformedBrands> => {
  const transformedBrands = [];

  for (let brand of brands) {
    transformedBrands.push({
      id: brand.url,
      name: brand.name,
    });
  }

  return transformedBrands;
};

export const transformSizes = (sizes: Array<Sizes>, categoryUrl: string): Array<TransformedSizes> => {
  const filteredSizes = sizes.filter(size => size.categoryUrl === categoryUrl);
  const transformedSizes = [];

  for (let size of filteredSizes) {
    if (typeof size.size == 'string') {
      transformedSizes.push({
        name: size.size,
        id: size.size,
      });
    }
    if (typeof size.size == 'object') {
      transformedSizes.push({
        name: `US ${size.size.us}`,
        id: `us-${size.size.us}`,
      });
    }
  }

  return transformedSizes;
};

export const transformConditions = (conditions: Array<Conditions>): Array<TransformedConditions> => {
  const transformedConditions = [];

  for (let condition of conditions) {
    transformedConditions.push({
      id: condition.url,
      name: condition.name,
    });
  }

  return transformedConditions;
};
