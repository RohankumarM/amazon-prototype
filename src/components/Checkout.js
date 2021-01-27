import React from 'react';
import SubTotal from '../components/SubTotal';
import CheckoutProduct from './CheckoutProduct';
import './Checkout.css';
import { connect } from 'react-redux';

function Checkout({ cart, user }) {

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img className="checkout__ad" src="https://images-eu.ssl-images-amazon.com/images/G/31/img17/Pantry/Diwali19/Wave2/StoreFront/ApayCashback/1500x200.jpg" alt="amazon banner" />

        <div>
          <h3>{`Hello ${user.user?.email === undefined ? 'Guest' : user.user.email}`}</h3>
          <h2 className="checkout__title">Your Shopping Cart</h2>
          {/*CheckoutProduct*/}
          {cart.basket.length > 0 ? cart.basket.map((item, index) => (
            <div key={index}>
              <CheckoutProduct id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating} />
            </div>
          )) : <div> Your shopping cart is Empty! Shop it up.</div>}
        </div>
      </div>

      <div className="checkout__right">
        <SubTotal />
      </div>

    </div>
  )
}


const mapStateToProps = (state) => {
  return { cart: state.basket, user: state.userInfo }
}


export default connect(mapStateToProps)(Checkout);
