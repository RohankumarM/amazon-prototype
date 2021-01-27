import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AmazonLogo from '../images/358-3584545_amazon-web-services-logo-png-transparent-svg-vector.png';
import './Header.css';
import { auth } from '../firebase';

function Header({ cart, user }) {

  const handleSignout = () => {
    auth.signOut();
  }

  return (
    <div className="header">
      <Link to="/">
        <img className="header__logo" src={AmazonLogo} alt="Amazon Logo" />
      </Link>
      <div className="header__search">
        <input className="header__searchInput" type="text"></input>
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <Link to={!user.user && '/login'}>
          <div className="header__option">
            <span className="header__option--LineOne">{`Hello ${user.user?.email === undefined ? 'Guest' : user.user.email}`}</span>
            <span className="header__option--LineTwo" onClick={handleSignout}>{`${user.user?.email ? 'Sign Out' : 'Sign In'}`}</span>
          </div>
        </Link>
        <Link to="/orders">
          <div className="header__option">
            <span className="header__option--LineOne">Returns</span>
            <span className="header__option--LineTwo">Orders</span>
          </div>
        </Link>
        <div className="header__option">
          <span className="header__option--LineOne">Your</span>
          <span className="header__option--LineTwo">Prime</span>
        </div>
        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingCartIcon />
            <span className="header__option--LineTwo header__basketCount">{cart.basket?.length}</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { cart: state.basket, user: state.userInfo }
}

export default connect(mapStateToProps)(Header);
