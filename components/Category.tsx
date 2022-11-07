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
import { transformBrands, transformSizes, transformConditions } from '@/helpers/transforms';
import Select from '@/components/blocks/Select';
import CardProduct from '@/components/cards/CardProduct';

type CategoryProps = {
  title: string;
  categoryId: string;
  data: Array<Brands | Sizes | Conditions>;
}

const emptySelectedItems = {
  brand: [],
  size: [],
  condition: [],
};

const Category: React.FC<CategoryProps> = (props: CategoryProps) => {
  const config = useSelector(state => state.config);

  const [brands, setBrands] = useState<Array<TransformedBrands>>(transformBrands(config?.data?.brands));
  const [sizes, setSizes] = useState<Array<TransformedSizes>>(transformSizes(config?.data?.sizes, props.categoryId));
  const [conditions, setConditions] = useState<Array<TransformedConditions>>(transformConditions(config?.data?.conditions));
  const [selectedItems, setSelectedItems] = useState(emptySelectedItems);
  const [removeItemData, setRemoveItemData] = useState({
    group: '',
    id: '',
  });
  const [clearSelectedItems, setClearSelectedItems] = useState<boolean>(false);

  const setValue = (cat: string, value: Array<any>): void => {
    setSelectedItems(prevState => ({
      ...prevState,
      [cat]: value,
    }));
  };

  const removeItem = (itemGroup: string, id: string): void => {
    setRemoveItemData(
      {
        group: itemGroup,
        id: id,
      }
    );
  };

  useEffect(() => {
    if (clearSelectedItems === true) setClearSelectedItems(false);
  });

  useEffect(() => {
    if (config?.data?.brands) setBrands(transformBrands(config?.data?.brands));
    if (config?.data?.sizes) setSizes(transformSizes(config?.data?.sizes, props.categoryId));
    if (config?.data?.conditions) setConditions(transformConditions(config?.data?.conditions));
  }, [config]);

  useEffect(() => {
    setSelectedItems(emptySelectedItems);
    setClearSelectedItems(true);
  }, [props.categoryId]);

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
                  clearItems={clearSelectedItems}
                />
              </div>
              <div className="block__item block__item--size">
                <Select
                  title="Size"
                  name="size"
                  options={sizes}
                  onChange={setValue.bind(this)}
                  removeItem={removeItemData}
                  clearItems={clearSelectedItems}
                />
              </div>
              <div className="block__item block__item--condition">
                <Select
                  title="Condition"
                  name="condition"
                  options={conditions}
                  onChange={setValue.bind(this)}
                  removeItem={removeItemData}
                  clearItems={clearSelectedItems}
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
