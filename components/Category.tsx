import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  Conditions,
  TransformedConditions,
  Sizes,
  TransformedSizes,
  Brands,
  TransformedBrands,
} from '@/types/types';
import Select from '@/components/blocks/Select';
import CardProduct from '@/components/cards/CardProduct';

type CategoryProps = {
  title: string;
  categoryId: string;
  data: Array<Brands | Sizes | Conditions>;
}

const Category: React.FC<CategoryProps> = (props: CategoryProps) => {
  const config = useSelector(state => state.config);

  const [brands, setBrands] = useState<Array<TransformedBrands>>([]);
  const [sizes, setSizes] = useState<Array<TransformedSizes>>([]);
  const [conditions, setConditions] = useState<Array<TransformedConditions>>([]);
  const [categoryId, setCategoryId] = useState('');
  const [selectedItems, setSelectedItems] = useState({
    brand: [],
    size: [],
    condition: [],
  });
  const [removeItemData, setRemoveItemData] = useState({
    group: '',
    id: '',
  });

  const transformBrands = (brands: Array<Brands>): Array<TransformedBrands> => {
    const transformedBrands = [];

    for (let brand of brands) {
      transformedBrands.push({
        id: brand.url,
        name: brand.name,
      });
    }

    return transformedBrands;
  }

  const transformSizes = (sizes: Array<Sizes>): Array<TransformedSizes> => {
    const filteredSizes = sizes.filter(size => size.categoryId === props.categoryId);
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

  const transformConditions = (conditions: Array<Conditions>): Array<TransformedConditions> => {
    const transformedConditions = [];

    for (let condition of conditions) {
      transformedConditions.push({
        id: condition.url,
        name: condition.name,
      });
    }

    return transformedConditions;
  }

  const setValue = (cat: string, value: Array<any>): void => {
    setSelectedItems(prevState => ({
      ...prevState,
      [cat]: value,
    }));
  }

  const removeItem = (itemGroup: string, id: string): void => {
    setRemoveItemData(
      {
        group: itemGroup,
        id: id,
      }
    );
  }

  const fetchData = async (): Promise<void> => {
    const brandsData = brands.length > 0 ? brands : config?.data?.brands;
    const sizesData = sizes.length > 0 ? sizes : config?.data?.sizes;
    const conditionsData = conditions.length > 0 ? conditions : config?.data?.conditions;

    if (props.categoryId !== categoryId) {
      setBrands([]);
      setSizes([]);
      setConditions([]);
    }

    if ((brandsData && !brands.length) &&
      (sizesData && !sizes.length) &&
      (conditionsData && !conditions.length)) {
      setBrands(transformBrands(brandsData as unknown as Array<Brands>));
      setSizes(transformSizes(sizesData as unknown as Array<Sizes>));
      setConditions(transformConditions(conditionsData as unknown as Array<Conditions>));
    }

    if (props.categoryId !== categoryId) setCategoryId(props.categoryId);
  }

  useEffect(() => {
    fetchData();
  });

  return (
    <main className="page page--category">
      <div className="container">
        <div className="row">
          <h1 className="page__title">{props.title}</h1>
        </div>
        <div className="row">
          <div className="block block--filter">
            <div className="block__content">
              <div className="block__item block__item--brand">
                <Select
                  title="Brand"
                  name="brand"
                  options={brands}
                  onChange={setValue.bind(this)}
                  removeItem={removeItemData}
                />
              </div>
              <div className="block__item block__item--size">
                <Select
                  title="Size"
                  name="size"
                  options={sizes}
                  onChange={setValue.bind(this)}
                  removeItem={removeItemData}
                />
              </div>
              <div className="block__item block__item--condition">
                <Select
                  title="Condition"
                  name="condition"
                  options={conditions}
                  onChange={setValue.bind(this)}
                  removeItem={removeItemData}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {(selectedItems.brand.length > 0 ||
            selectedItems.size.length > 0 ||
            selectedItems.condition.length > 0) && (
              <div className="block block--selected-items">
                van
                {Object.keys(selectedItems).map((itemGroup) => {
                  return (
                    selectedItems[itemGroup].length > 0 && (
                      selectedItems[itemGroup].map((item, i) => {
                        return (
                          <div
                            className="block__item"
                            onClick={() => removeItem(itemGroup, item.id)}
                            key={i}
                          >
                            {item.name}
                          </div>
                        )
                      })
                    )
                  )
                })}
              </div>
            )}
        </div>
        <div className="row">
          {props.data !== null && props.data.length > 0 && (
            <div className="page__content">
              {props.data.map((d: any, index: number) => {
                return (
                  <div className="col-lg-3 col-md-4 col-6" key={index}>
                    <CardProduct
                      img={d.images[0]}
                      brand={d.brand.name}
                      name={d.name}
                      price={d.price}
                      url="/product"
                      details={[d.condition.name, `US ${d.size.size.us}`]}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  )
};

export default Category;
