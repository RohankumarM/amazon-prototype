import React from 'react';
import { connect } from 'react-redux';
import { addToBasket } from '../actions';
import { useSpring, animated } from 'react-spring';
import { useToasts } from 'react-toast-notifications'
import './Product.css';

const calc = (x, y) => [(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 5) / 200, 1.0];
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const Product = ({ id, title, image, price, rating, addToBasket, basket }) => {

  const { addToast } = useToasts();

  const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 500, friction: 40 } }));

  const addToBasketHandler = () => {
    addToBasket(id, title, image, price, rating);
    addToast(`${title} has been succesfully added to your cart.`, {
      appearance: 'success',
      autoDismiss: true,
    });
  }

  return (
      <animated.div
        className="product"
        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        style={{ transform: props.xys.interpolate(trans) }}
      >
        <div className="product__info">
          <p>{title}</p>
          <p className="product__price">
            <small>$</small>
            <strong>{price}</strong>
          </p>
          <div className="product__rating">
            {Array(rating).fill().map((rat, index) => <p key={index}>⭐</p>)}
          </div>
        </div>
        <img src={image} alt="Dell Laptop" />
        <button onClick={addToBasketHandler}>
          Add to Basket
      </button>
      </animated.div>
  )
}

const mapStateToProps = (state) => {
  return { basket: state.basket }
}

export default connect(mapStateToProps, { addToBasket })(Product);
