import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dispatch } from 'redux';

import {
  Conditions,
  TransformedConditions,
  Sizes,
  TransformedSizes,
  Brands,
  TransformedBrands
} from '@/types/types';
import { configActionCreators } from '@/store/config/index';
import Select from '@/components/blocks/Select';
import CardProduct from '@/components/cards/CardProduct';

type CategoryProps = {
  title: string;
  categoryId: string;
  data: Array<Brands | Sizes | Conditions>;
  config: any;
}

type CategoryState = {
  brands: Array<TransformedBrands>;
  sizes: Array<TransformedSizes>;
  conditions: Array<TransformedConditions>;
  categoryId: string;
  selectedItems: any;
  removeItemData: any;
}

class Category extends Component<CategoryProps, CategoryState> {
  public state: CategoryState = {
    brands: [],
    sizes: [],
    conditions: [],
    categoryId: '',
    selectedItems: {
      brand: [],
      size: [],
      condition: [],
    },
    removeItemData: {},
  };

  public render() {
    return (
      <main className="page page--category">
        <div className="container">
          <div className="row">
            <h1 className="page__title">{this.props.title}</h1>
          </div>
          <div className="row">
            <div className="block block--filter">
              <div className="block__content">
                <div className="block__item block__item--brand">
                  <Select
                    title="Brand"
                    name="brand"
                    options={this.state.brands}
                    onChange={this.setValue.bind(this)}
                    removeItem={this.state.removeItemData} />
                </div>
                <div className="block__item block__item--size">
                  <Select
                    title="Size"
                    name="size"
                    options={this.state.sizes}
                    onChange={this.setValue.bind(this)}
                    removeItem={this.state.removeItemData} />
                </div>
                <div className="block__item block__item--condition">
                  <Select
                    title="Condition"
                    name="condition"
                    options={this.state.conditions}
                    onChange={this.setValue.bind(this)}
                    removeItem={this.state.removeItemData} />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {(this.state.selectedItems.brand.length > 0 ||
              this.state.selectedItems.size.length > 0 ||
              this.state.selectedItems.condition.length > 0) && (
              <div className="block block--selected-items">
                {Object.keys(this.state.selectedItems).map((itemGroup) => {
                  return (
                    this.state.selectedItems[itemGroup].length > 0 && (
                      this.state.selectedItems[itemGroup].map((item, i) => {
                        return (
                          <div
                            className="block__item"
                            onClick={() => this.removeItem(itemGroup, item.id)}
                            key={i}>
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
            {this.props.data !== null && this.props.data.length > 0 && (
              <div className="page__content">
                {this.props.data.map((d: any, index: number) => {
                  return (
                    <div className="col-lg-3 col-md-4 col-6" key={index}>
                      <CardProduct
                        img={d.images[0]}
                        brand={d.brand.name}
                        name={d.name}
                        price={d.price}
                        url="/termek"
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

  public fetchData = async (): Promise<void> => {
    const brands = this.state.brands.length > 0 ? this.state.brands : this.props.config?.data?.brands;
    const sizes = this.state.sizes.length > 0 ? this.state.sizes : this.props.config?.data?.sizes;
    const conditions = this.state.conditions.length > 0 ? this.state.conditions : this.props.config?.data?.conditions;

    if (this.props.categoryId !== this.state.categoryId) {
      this.setState({
        brands: [],
        sizes: [],
        conditions: [],
      });
    }

    if ((brands && !this.state.brands.length) &&
      (sizes && !this.state.sizes.length) &&
      (conditions && !this.state.conditions.length)) {
      this.setState({
        brands: this.transformBrands(brands as unknown as Array<Brands>),
        sizes: this.transformSizes(sizes as unknown as Array<Sizes>),
        conditions: this.transformConditions(conditions as unknown as Array<Conditions>),
      });
    }

    if (this.props.categoryId !== this.state.categoryId) {
      this.setState({ categoryId: this.props.categoryId });
    }
  }

  public transformBrands = (brands: Array<Brands>): Array<TransformedBrands> => {
    const transformedBrands = [];

    for (let brand of brands) {
      transformedBrands.push({
        id: brand.url,
        name: brand.name,
      });
    }

    return transformedBrands;
  }

  public transformSizes = (sizes: Array<Sizes>): Array<TransformedSizes> => {
    const filteredSizes = sizes.filter(size => size.categoryId === this.props.categoryId);
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

  public transformConditions = (conditions: Array<Conditions>): Array<TransformedConditions> => {
    const transformedConditions = [];

    for (let condition of conditions) {
      transformedConditions.push({
        id: condition.url,
        name: condition.name,
      });
    }

    return transformedConditions;
  }

  public setValue = (cat: string, value: Array<any>): void => {
    let selectedItems = this.state.selectedItems;
    selectedItems[cat] = value;

    this.setState({ selectedItems: selectedItems });
  };

  public removeItem = (itemGroup: string, id: string): void => {
    this.setState({
      removeItemData: {
        group: itemGroup,
        id: id,
      }
    });
  }

  componentDidMount = (): void => {
    this.fetchData();
  }

  componentDidUpdate = (): void => {
    this.fetchData();
  }
}

const mapStateToProps = (state: any) => {
  return {
    config: state.config,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  ...bindActionCreators(configActionCreators, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);
