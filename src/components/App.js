import React, { useEffect } from 'react';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment';
import Orders from './Orders';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { auth } from '../firebase';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { addUser } from '../actions';
import { connect } from 'react-redux';

const promise = loadStripe('pk_test_51IEC0KFfdknnhMhLKKD16ioY6sXb6ng2YHHOw8H06uA5QaoqaW1NOE40w8oKxch8SPpMlW8K7Mx5WTEdUwyuaXTx00BunhDZRl');

const App = ({ addUser }) => {

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        addUser(user);
      } else {
        console.log(user);
        addUser(null);
      }
    })
  }, []);

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Header />
            <Home />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default connect(null, { addUser })(App);
