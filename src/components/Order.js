import React from 'react';
import CheckoutProduct from './CheckoutProduct';
import moment from 'moment';
import { connect } from 'react-redux';
import CurrenyFormat from 'react-currency-format';
import './Order.css';

function Order({ order, cart }) {
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM DD YY, h:mma")}</p>
      <p className="order__id">
        <small>{order.id}</small>
      </p>
      {order.data?.basket?.basket.map(item => (
        <CheckoutProduct id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hideButton />
      ))}
      <CurrenyFormat
        renderText={(value) => (
          <div>
          </div>
        )}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return { cart: state.basket }
};

export default connect(mapStateToProps)(Order);
