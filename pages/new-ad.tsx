import { Component, createRef } from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dispatch } from 'redux';

import Layout, { siteTitle } from '@/components/Layout';
import { authActionCreators } from '@/store/auth/index';
import { configActionCreators } from '@/store/config/index';
import ProgressBar from '@/components/blocks/ProgressBar';
import ContentBlock from '@/components/blocks/ContentBlock';
import Input from '@/components/form/Input';
import InputSelect from '@/components/form/InputSelect';
import Radio from '@/components/form/Radio';
import Textarea from '@/components/form/Textarea';
import ImageFileSelect from '@/components/form/ImageFileSelect';

type SneakerSize = {
  eu: number;
  us: number;
  uk: number;
}

type SelectedSizeValue = {
  categoryUrl: string;
  title: SneakerSize | string;
};

type SelectedValue = {
  url: string;
  name: string;
};

type NewAdPageProps = {
  auth: any;
  config: any;
};

type NewAdPageState = {
  active: number;
  product: {
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
};

const emptySelectedValue = {
  url: '',
  name: '',
};

class NewAdPage extends Component<NewAdPageProps> {
  public state: NewAdPageState = {
    active: 0,
    product: {
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
    },
  };

  public render() {
    if (!this.props.auth?.token) return null;
    return (
      <Layout>
        <Head>
          <title>New ad – {siteTitle}</title>
        </Head>
        <main className="page page--new-ad">
          <h1 className="page__title">New ad</h1>
          <div className="page__content">
            <ProgressBar
              items={this.progressBarItems}
              active={this.state.active}
              onClick={this.handleChangeStep.bind(this)} />
            <div className="container">
              {this.state.active === 0 && (
              <div className="row page__row justify-content-center">
                <div className="col-12 col-lg-8">
                  <ContentBlock
                    title={`${this.state.product.category?.name ? `Category: ${this.state.product.category.name}` : 'Choose category'}`}
                    content={this.props.config?.data?.categories?.length > 0 && (
                      <ul className="list list--select">
                        {this.props.config.data.categories.map((category, index) => {
                          return (
                            <li
                              className={`list__item ${this.state.product.category.url === category.url ? 'is-active' : ''}`}
                              key={index}
                              onClick={() => this.selectProduct('category', category)}>
                              {category.name}
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  />

                  {this.state.product.category.name && (
                  <ContentBlock
                    title={`${this.state.product.brand?.name ? `Brand: ${this.state.product.brand.name}` : 'Choose brand'}`}
                    content={this.props.config?.data?.brands?.length > 0 && (
                      <ul className="list list--select">
                        {this.props.config.data.brands.map((brand, index) => {
                          return (
                            <li
                              className={`list__item ${this.state.product.brand.url === brand.url ? 'is-active' : ''}`}
                              key={index}
                              onClick={() => this.selectProduct('brand', brand)}>
                              {brand.name}
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  />
                  )}

                  {this.state.product.brand.name && (
                  <ContentBlock
                    title="Detailed information"
                    content={(
                      <div className="row">
                        <div className="col-lg-6">
                          <Input
                            type="text"
                            name="product.name"
                            title="Product name"
                            value={this.state.product.name}
                            onChange={this.setValue.bind(this)}
                          />
                        </div>
                        <div className="col-lg-6">
                          <Input
                            type="number"
                            name="product.price"
                            title="Product price"
                            value={this.state.product.price}
                            onChange={this.setValue.bind(this)}
                          />
                        </div>
                        <div className="col-lg-6">
                          <div className="block__select__col-2">
                            <InputSelect
                              name="product.size"
                              title="Product size"
                              options={this.transformSizesObject(this.sizesByCategoryUrl(this.state.product.category.url))}
                              extraOption={(this.state.product.category.url === 'sneaker') ? this.state.product.sizeOption?.url ? this.state.product.sizeOption : this.sizeOptionsDefault() : ''}
                              onChange={this.setValue.bind(this)}
                            />
                            {this.state.product.category.url === 'sneaker' && (
                              <InputSelect
                                name="product.sizeOption"
                                title="Size option"
                                options={this.sizeOptions}
                                defaultOption={this.sizeOptionsDefault()}
                                onChange={this.setValue.bind(this)}
                              />
                            )}
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="block__content__full">
                            <div className="block__subtitle">Product condition</div>
                            {this.props.config?.data?.conditions?.length > 0 && (
                              this.props.config?.data?.conditions.map((condition, index) => {
                                return (
                                  <Radio
                                    key={index}
                                    name="product.condition"
                                    isActive={JSON.stringify(this.state.product.condition) === JSON.stringify(condition) ? true : false}
                                    option={condition}
                                    onChange={this.setValue.bind(this)}
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
                              onChange={this.setValue.bind(this)}
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

              {this.state.active === 1 && (
                <div className="row page__row justify-content-center">
                  <div className="col-12 col-lg-8">
                    <ContentBlock
                      title={`${this.state.product.shippingMethod?.name ? `Shipping method: ${this.state.product.shippingMethod.name}` : 'Choose shipping method'}`}
                      content={this.props.config?.data?.deliveries?.length > 0 && (
                        <ul className="list list--select">
                          {this.props.config.data.deliveries.map((delivery, index) => {
                            return (
                              <li
                                className={`list__item ${this.state.product.shippingMethod.url === delivery.url ? 'is-active' : ''}`}
                                key={index}
                                onClick={() => this.selectProduct('shippingMethod', delivery)}>
                                {delivery.name}
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    />

                    {this.state.product.shippingMethod.name && (
                    <ContentBlock
                      title="Contact"
                      content={(
                        <div className="row">
                          <div className="col-lg-6">
                            <Input
                              type="text"
                              name="product.telephone"
                              title="Phone number"
                              value={this.state.product.telephone}
                              onChange={this.setValue.bind(this)}
                            />
                          </div>
                          <div className="col-lg-6">
                            <Input
                              type="text"
                              name="product.location"
                              title="Location"
                              value={this.state.product.location}
                              onChange={this.setValue.bind(this)}
                            />
                          </div>
                        </div>
                      )}
                    />
                    )}
                  </div>
                </div>
              )}

              {this.state.active === 2 && (
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
      </Layout>
    )
  };

  public progressBarItems = [
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
      name: 'images',
      title: 'Images',
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

  public sizeOptions = [
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

  public sizesByCategoryUrl = (categoryUrl: string) => {
    return (this.props.config?.data?.sizes)
      ? this.props.config?.data?.sizes?.filter(s => s.categoryUrl === categoryUrl)
      : '';
  };

  public transformSizesObject = (sizes: Array<any>): Array<SelectedSizeValue> => {
    return sizes.map(({size, categoryUrl}) => ({
      title: size,
      categoryUrl,
    }));
  };

  public sizeOptionsDefault = (): any => {
    return this.sizeOptions.find(o => o.default === true);
  };

  public setValue = (field: string, value: string): void => {
    const data = this.fieldHandler(field, value);
    this.setState(data);
  };

  public handleChangeStep = (index: number) => {
    this.setState({ active: index });
  };

  public fieldHandler = (field: string, value: string) => {
    const currentState = this.state;

    if (field.includes('.'))
      currentState[field.split('.')[0]][field.split('.')[1]] = value;
    else currentState[field] = value;

    return currentState;
  }

  public selectProduct(key: string, value: any): void {
    const productState = this.state.product;
    productState[key] = value;

    this.setState({ product: productState });
  }
}

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
    config: state.config,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  ...bindActionCreators(authActionCreators, dispatch),
  ...bindActionCreators(configActionCreators, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewAdPage);
