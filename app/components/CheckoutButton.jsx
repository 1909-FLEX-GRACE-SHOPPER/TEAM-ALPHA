import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

import STRIPE_PUBLISHABLE from '../constants/stripe';
import PAYMENT_SERVER_URL from '../constants/server';
import { uuidv4 } from '../utils';

const CURRENCY = 'USD';

const fromUsdToCent = amount => amount * 100;

// change these; just good for manual testing
// const successPayment = data => {
//   alert('Payment Successful');
//   // better way to do this for sure
//   window.location.href = 'success';
// };

// const errorPayment = data => {
//   alert('Payment Error');
//   // better way to do this for sure
//   // change...
//   window.location.href = 'success';
// };

// const onToken = (amount, description) => token =>
//   axios
//     .post(PAYMENT_SERVER_URL, {
//       description,
//       source: token.id,
//       currency: CURRENCY,
//       amount: fromUsdToCent(amount)
//     })
//     .then(successPayment)
//     .catch(errorPayment);

// const Checkout = ({ name, description, amount }) => (
//   <StripeCheckout
//     name={name}
//     description={description}
//     amount={fromUsdToCent(amount)}
//     token={onToken(amount, description)}
//     currency={CURRENCY}
//     stripeKey={STRIPE_PUBLISHABLE}
//   />
// );

class Checkout extends Component {
  successPayment = data => {
    alert('Payment Successful');
    // better way to do this for sure
    window.location.href = 'success';
  };

  errorPayment = data => {
    console.log('button props:', this.props);

    const {
      activeOrder,
      submitOrder,
      activeUser,
      createOrder,
      cart,
      postGuestItems,
      createUser,
      authentication
    } = this.props;
    const id = activeOrder.id;
    // signed in user
    if (authentication.isLoggedIn) {
      submitOrder(activeOrder);
      window.location.href = `success/${id}`;
      return null;
    }
    // guest user
    // else {
    //   // post the guest user
    //   activeUser.userTypes = 'guest';
    //   const userId = uuidv4();
    //   activeUser.id = userId;
    //   // for now need to give the fake user a fake password
    //   activeUser.password = 'guestPwd';
    //   createUser(activeUser);
    //   // Associate the order with the user and post the order
    //   activeOrder.userId = userId;
    //   activeOrder.status = 'ordered';
    //   createOrder(activeOrder);
    //   // associate the cart items with the order and post it
    //   // (recall that order already has its own id)
    //   const { items } = cart;
    //   items.forEach(item => {
    //     item.orderId = activeOrder.id;
    //     // might have to delete some info (like the product)
    //   });
    //   postGuestItems(items);
    // }
    else {
      // post the guest user
      activeUser.userTypes = 'guest';
      const userId = uuidv4();
      activeUser.id = userId;
      activeUser.password = 'guestPwd';
      createUser(activeUser).then(() => {
        activeOrder.userId = userId;
        activeOrder.status = 'ordered';
        return createOrder(activeOrder).then(() => {
          const { items } = cart;
          items.forEach(item => {
            item.orderId = activeOrder.id;
          });
          postGuestItems(items);
          window.location.href = `success/${id}`;
          return null;
        });
      });
    }

    // this worked Friday AM - jsut saving for now
    // const { order, submitOrder } = this.props;
    // submitOrder(order);
    // alert('Payment Error');
    // better way to do this for sure
    // change...

    // window.location.href = `success/${id}`;
  };

  // might want to make this a thunk to move the axios call out of here
  onToken = (amount, description) => token => {
    axios
      .post(PAYMENT_SERVER_URL, {
        description,
        source: token.id,
        currency: CURRENCY,
        amount: fromUsdToCent(amount)
      })
      .then(this.successPayment)
      .catch(this.errorPayment);
  };

  render() {
    const { name, description, amount } = this.props;
    const { onToken } = this;

    return (
      <StripeCheckout
        name={name}
        description={description}
        amount={fromUsdToCent(amount)}
        token={onToken(amount, description)}
        currency={CURRENCY}
        stripeKey={STRIPE_PUBLISHABLE}
      />
    );
  }
}

// const mapStateToProps = ({ orders, submitOrder, authentication, cart }) => ({
//   orders,
//   s
// })

export default Checkout;
