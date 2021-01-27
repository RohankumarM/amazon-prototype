import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { connect } from 'react-redux';
import Order from './Order';
import './Orders.css';

function Orders({ user }) {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user.user) {
      db.collection('users')
        .doc(user.user?.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot(snapshot => {
          setOrders(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })))
        });
    } else {
      setOrders([]);
    }
  }, [user]);

  console.log(orders)

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__order">
        {orders?.map(order => <Order order={order} />
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { user: state.userInfo }
}

export default connect(mapStateToProps)(Orders);
