import React from 'react';
import CurrenyFormat from 'react-currency-format';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './SubTotal.css';

function SubTotal({ cart }) {

  const history = useHistory();

  const getBasketTotal = ({ basket }) => basket?.reduce((amount, item) => item.price + amount, 0);

  return (
    <div className="subtotal">
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

      <button onClick={e => history.push('/payment')}>Process to Checkout</button>

    </div>
  )
}

const mapStateToProps = (state) => {
  return { cart: state.basket }
}

export default connect(mapStateToProps)(SubTotal);