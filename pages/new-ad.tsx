import { useState } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';

import { siteTitle } from '@/components/Layout';
import ProgressBar from '@/components/blocks/ProgressBar';
import ContentBlock from '@/components/blocks/ContentBlock';
import Input from '@/components/form/Input';
import InputSelect from '@/components/form/InputSelect';
import Radio from '@/components/form/Radio';
import Textarea from '@/components/form/Textarea';
import ImageFileSelect from '@/components/form/ImageFileSelect';
import { ShoesSize } from '@/types/types';

type SelectedSizeValue = {
  categoryUrl: string;
  title: ShoesSize | string;
};

export interface Sizes {
  size: string | ShoesSize;
  categoryUrl: string;
}

type SelectedValue = {
  url: string;
  name: string;
};

const emptySelectedValue = {
  url: '',
  name: '',
};

export interface IProduct {
  name: string;
  price: number;
  category: SelectedValue;
  brand: SelectedValue;
  size: SelectedSizeValue;
  sizeOption: {
    url: string;
    title: string;
  };
  condition: any;
  description: string;
  shippingMethod: any;
  telephone: string;
  location: string;
  images: Array<any>;
};

export interface IFieldHandler {
  state: string;
  field: string;
  value: string;
};

const NewAdPage: React.FC = () => {
  const authManagement = useSelector(state => state.auth);
  const config = useSelector(state => state.config);

  const [active, setActive] = useState<number>(0);
  const [product, setProduct] = useState<IProduct>({
    name: '',
    price: null,
    category: emptySelectedValue,
    brand: emptySelectedValue,
    size: {
      categoryUrl: '',
      title: '',
    },
    sizeOption: {
      url: '',
      title: '',
    },
    condition: '',
    description: '',
    shippingMethod: '',
    telephone: '',
    location: '',
    images: [],
  });

  const progressBarItems = [
    {
      name: 'data',
      title: 'Data',
      active: true,
      filled: false,
    },
    {
      name: 'contact',
      title: 'Contact',
      active: false,
      filled: false,
    },
    {
      name: 'summary',
      title: 'Summary',
      active: false,
      filled: false,
    },
  ];

  const sizeOptions = [
    {
      url: 'eu',
      title: 'EU',
      default: true,
    },
    {
      url: 'us',
      title: 'US',
      default: false,
    },
    {
      url: 'uk',
      title: 'UK',
      default: false,
    },
  ];

  const sizesByCategoryUrl = (categoryUrl: string): any => {
    return (config?.data?.sizes)
      ? config?.data?.sizes?.filter(s => s.categoryUrl === categoryUrl)
      : '';
  };

  const transformSizesObject = (sizes: Array<Sizes>): Array<SelectedSizeValue> => {
    return sizes.map(({ size, categoryUrl }) => ({
      title: size,
      categoryUrl,
    }));
  };

  const sizeOptionsDefault = (): any => {
    return sizeOptions.find(o => o.default === true);
  };

  const fieldHandler = (name: string, value: string): IFieldHandler => {
    const [state, field] = name.split('.');

    return {
      state,
      field,
      value,
    };
  };

  const setValue = (field: string, value: string): void => {
    const data = fieldHandler(field, value);

    setProduct(prevState => ({
      ...prevState,
      [data.field]: value,
    }));
  };

  const handleChangeStep = (index: number) => setActive(index);

  const selectProduct = (key: string, value: any): void => {
    setProduct(prevState => ({
      ...prevState,
      [key]: value,
    }));
  }

  if (!authManagement?.token) return null;
  return (
    <>
      <Head>
        <title>New ad – {siteTitle}</title>
      </Head>
      <main className="page page--new-ad">
        <h1 className="page__title">New ad</h1>
        <div className="page__content">
          <ProgressBar
            items={progressBarItems}
            active={active}
            onClick={handleChangeStep.bind(this)} />
          <div className="container">
            {active === 0 && (
              <div className="row page__row justify-content-center">
                <div className="col-12 col-lg-8">
                  <ContentBlock
                    title={`${product.category?.name ? `Category: ${product.category.name}` : 'Choose category'}`}
                    content={config?.data?.categories?.length > 0 && (
                      <ul className="list list--select">
                        {config.data.categories.map((category, index) => {
                          return (
                            <li
                              className={`list__item ${product.category.url === category.url ? 'is-active' : ''}`}
                              key={index}
                              onClick={() => selectProduct('category', category)}>
                              {category.name}
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  />

                  {product.category.name && (
                    <ContentBlock
                      title={`${product.brand?.name ? `Brand: ${product.brand.name}` : 'Choose brand'}`}
                      content={config?.data?.brands?.length > 0 && (
                        <ul className="list list--select">
                          {config.data.brands.map((brand, index) => {
                            return (
                              <li
                                className={`list__item ${product.brand.url === brand.url ? 'is-active' : ''}`}
                                key={index}
                                onClick={() => selectProduct('brand', brand)}>
                                {brand.name}
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    />
                  )}

                  {product.brand.name && (
                    <ContentBlock
                      title="Detailed information"
                      content={(
                        <div className="row">
                          <div className="col-lg-6">
                            <Input
                              type="text"
                              name="product.name"
                              title="Product name"
                              value={product.name}
                              onChange={setValue.bind(this)}
                            />
                          </div>
                          <div className="col-lg-6">
                            <Input
                              type="number"
                              name="product.price"
                              title="Product price"
                              value={product.price}
                              onChange={setValue.bind(this)}
                            />
                          </div>
                          <div className="col-lg-6">
                            <div className="block__select__col-2">
                              <InputSelect
                                name="product.size"
                                title="Product size"
                                options={transformSizesObject(sizesByCategoryUrl(product.category.url))}
                                extraOption={(product.category.url === 'sneaker') ? product.sizeOption?.url ? product.sizeOption : sizeOptionsDefault() : ''}
                                onChange={setValue.bind(this)}
                              />
                              {product.category.url === 'sneaker' && (
                                <InputSelect
                                  name="product.sizeOption"
                                  title="Size option"
                                  options={sizeOptions}
                                  defaultOption={sizeOptionsDefault()}
                                  onChange={setValue.bind(this)}
                                />
                              )}
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="block__content__full">
                              <div className="block__subtitle">Product condition</div>
                              {config?.data?.conditions?.length > 0 && (
                                config?.data?.conditions.map((condition, index) => {
                                  return (
                                    <Radio
                                      key={index}
                                      name="product.condition"
                                      isActive={JSON.stringify(product.condition) === JSON.stringify(condition) ? true : false}
                                      option={condition}
                                      onChange={setValue.bind(this)}
                                    />
                                  );
                                })
                              )}
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="block__content__full">
                              <div className="block__subtitle">
                                Product description
                              </div>
                              <Textarea
                                name="product.description"
                                title="Product description"
                                value={product.description}
                                onChange={setValue.bind(this)}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    />
                  )}
                </div>
              </div>
            )}

            {active === 1 && (
              <div className="row page__row justify-content-center">
                <div className="col-12 col-lg-8">
                  <ContentBlock
                    title={`${product.shippingMethod?.name ? `Shipping method: ${product.shippingMethod.name}` : 'Choose shipping method'}`}
                    content={config?.data?.deliveries?.length > 0 && (
                      <ul className="list list--select">
                        {config.data.deliveries.map((delivery, index) => {
                          return (
                            <li
                              className={`list__item ${product.shippingMethod.url === delivery.url ? 'is-active' : ''}`}
                              key={index}
                              onClick={() => selectProduct('shippingMethod', delivery)}>
                              {delivery.name}
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  />

                  {product.shippingMethod.name && (
                    <ContentBlock
                      title="Contact"
                      content={(
                        <div className="row">
                          <div className="col-lg-6">
                            <Input
                              type="text"
                              name="product.telephone"
                              title="Phone number"
                              value={product.telephone}
                              onChange={setValue.bind(this)}
                            />
                          </div>
                          <div className="col-lg-6">
                            <Input
                              type="text"
                              name="product.location"
                              title="Location"
                              value={product.location}
                              onChange={setValue.bind(this)}
                            />
                          </div>
                        </div>
                      )}
                    />
                  )}
                </div>
              </div>
            )}

            {active === 2 && (
              <div className="row page__row justify-content-center">
                <div className="col-12 col-lg-8">
                  <ContentBlock
                    content={(
                      <div className="block block--image-upload">
                        <div className="row">
                          <div className="block__subtitle">Upload your images</div>
                          <p className="block__lead">File supports: JPG, JPEG, PNG</p>
                          <p className="block__lead">File size limit: 2MB / image</p>
                        </div>
                        <div className="row">
                          <div className="col-6 col-md-4">
                            <ImageFileSelect
                              buttonContent={'Select an image'}
                            />
                          </div>
                          <div className="col-6 col-md-4">
                            <ImageFileSelect
                              buttonContent={'Select an image'}
                            />
                          </div>
                          <div className="col-6 col-md-4">
                            <ImageFileSelect
                              buttonContent={'Select an image'}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default NewAdPage;
