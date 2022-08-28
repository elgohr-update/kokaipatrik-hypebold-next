import React from 'react';
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

const CardProduct: React.FC<CardProductProps> = (props: CardProductProps) => {
  return (
    <Link href={props.url}>
      <div className="card card--product">
        <figure className="card__figure">
          <img
            src={ProductImage.src}
            alt={props.name}
            title={props.name}
            className="card__img"
          />
        </figure>
        <div className="card__content">
          {props.details.length > 0 && (
            <div className="card__details">
              <ul className="card__details__list">
                {props.details.map((detail, i) => {
                  return (
                    <li className="card__details__item" key={i}>
                      {detail}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          <span className="card__brand">{props.brand}</span>
          <h3 className="card__title">{props.name}</h3>
          <p className="card__price">{props.price}</p>
        </div>
      </div>
    </Link>
  );
}

export default CardProduct;
