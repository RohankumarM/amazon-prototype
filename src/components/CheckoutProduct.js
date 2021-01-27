import React from 'react';
import { connect } from 'react-redux';
import { removeFromBasket } from '../actions';
import './CheckoutProduct.css';

function CheckoutProduct({ id, image, title, price, rating, removeFromBasket, hideButton }) {

  const removeFromBasketHandler = () => {
    removeFromBasket(id);
  }

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={image} alt="product_image" />

      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating).fill().map(rat => <p>⭐</p>)}
        </div>
        {!hideButton && (<button onClick={removeFromBasketHandler}>Remove from Basket</button>)}
      </div>
    </div>
  )
}

export default connect(null, { removeFromBasket })(CheckoutProduct);
