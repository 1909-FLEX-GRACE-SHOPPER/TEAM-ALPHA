import React, { Component } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

import STRIPE_PUBLISHABLE from '../../StripeConstants/frontend/stripe';
import PAYMENT_SERVER_URL from '../../StripeConstants/frontend/server';
import { uuidv4 } from '../utils';

const CURRENCY = 'USD';

const nycTax = 1.08875;

const fromUsdToCent = amount => amount * 100;

class Checkout extends Component {
  successPayment = data => {
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
    localStorage.setItem('ACTIVE_USER', JSON.stringify(activeUser));
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
      activeUser.userType = 'guest';
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

  errorPayment = data => {
    // eslint-disable-next-line no-alert
    alert(
      'Payment Failed. Try rentering your information or checking your payment information'
    );
  };

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
    const {
      name,
      description,
      amount,
      billingAddress,
      billingCity,
      billingState,
      billingZip,
      shipBillStatus
    } = this.props;
    const { onToken } = this;

    return (
      <StripeCheckout
        name={name}
        description={description}
        amount={fromUsdToCent(amount * nycTax)}
        token={onToken(amount, description)}
        currency={CURRENCY}
        stripeKey={STRIPE_PUBLISHABLE}
        disabled={
          shipBillStatus === true
            ? false
            : !billingAddress || !billingCity || !billingState || !billingZip
            ? true
            : false
        }
      />
    );
  }
}

export default Checkout;
