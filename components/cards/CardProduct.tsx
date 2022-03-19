import { Component } from 'react';
import Link from 'next/link';

import ProductImage from '@/assets/img/product.jpg';

type CardProductProps = {
  img: string;
  brand: string;
  name: string;
  price: number;
  url: string;
  details: Array<string>;
};

class CardProduct extends Component<CardProductProps> {
  public render() {
    return (
      <Link href={this.props.url}>
        <div className="card card--product">
          <figure className="card__figure">
            <img
              src={ProductImage.src}
              alt={this.props.name}
              title={this.props.name}
              className="card__img"
            />
          </figure>
          <div className="card__content">
            {this.props.details.length > 0 && (
              <div className="card__details">
                <ul className="card__details__list">
                  {this.props.details.map((detail, i) => {
                    return (
                      <li className="card__details__item" key={i}>
                        {detail}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            <span className="card__brand">{this.props.brand}</span>
            <h3 className="card__title">{this.props.name}</h3>
            <p className="card__price">{this.props.price}</p>
          </div>
        </div>
      </Link>
    );
  }
}

export default CardProduct;
