import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import CurrenyFormat from 'react-currency-format';
import CheckoutProduct from './CheckoutProduct';
import axios from './axios';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { emptyBasket } from '../actions';
import { db } from '../firebase';
import './Payment.css';

function Payment({ user, cart, emptyBasket }) {

  const history = useHistory();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await axios({
        method: 'post',
        url: `/payments/create?total=${getBasketTotal(cart) * 100}`
      });
      setClientSecret(response.data.clientSecret);
    })();

  }, [cart]);
  console.log(clientSecret)

  const stripe = useStripe();
  const elements = useElements();

  const getBasketTotal = ({ basket }) => basket?.reduce((amount, item) => item.price + amount, 0);

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    })
    .then(({ paymentIntent }) => {

      db.collection('users').doc(user.user?.uid).collection('orders').doc(paymentIntent.id).set({
        basket: cart,
        amount: paymentIntent.amount,
        created: paymentIntent.created
      })

      setSucceeded(true);
      setError(null);
      setProcessing(false);

      emptyBasket();

      history.replace('/orders');
    })
  };

  const handleCardChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  }

  return (
    <div className="payment">
      <div className="payment__container">

        <h1>Checkout (<Link to="/checkout">{cart.basket?.length} items</Link>)</h1>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user.user === null ? <Link to="/login">Please Login to continue</Link> : user.user?.email}</p>
            <p>29200 Carlos Bee Boulevard</p>
            <p>San Francisco, CA</p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {cart.basket.length > 0 ? cart.basket.map(item => (
              <CheckoutProduct id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating} />
            )) : <div> Your shopping cart is Empty! Shop it up.</div>}
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handlePayment}>
              <CardElement onChange={handleCardChange} />
              <div className="payment__priceContainer">
                <CurrenyFormat
                  renderText={(value) => (
                    <div>
                      <p>Subtotal ({cart.basket?.length} items): <strong>{getBasketTotal(cart)}</strong></p>
                      <small className="subtotal__gift">
                        <input type="checkbox" />This order contains a gift
                      </small>
                    </div>
                  )}
                  decimalScale={2}
                  value={0}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { cart: state.basket, user: state.userInfo }
}

export default connect(mapStateToProps, { emptyBasket })(Payment);
