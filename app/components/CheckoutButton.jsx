import React, { Component } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

import STRIPE_PUBLISHABLE from '../constants/stripe';
import PAYMENT_SERVER_URL from '../constants/server';
import { uuidv4 } from '../utils';

const CURRENCY = 'USD';

const fromUsdToCent = amount => amount * 100;

// note: we will change all the logic in error payment to be in successPayment
// once I set up the Stripe backend - JH
class Checkout extends Component {
  successPayment = data => {
    alert('Payment Successful');
    // better way to do this for sure
    window.location.href = 'success';
  };

  errorPayment = data => {
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
    else {
      // 1) post the guest user
      // 2) then post order associated with user
      // 3) then post order items associated with order
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

export default Checkout;
