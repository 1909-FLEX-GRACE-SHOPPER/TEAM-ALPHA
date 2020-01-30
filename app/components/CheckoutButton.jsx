import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

import STRIPE_PUBLISHABLE from '../constants/stripe';
import PAYMENT_SERVER_URL from '../constants/server';

const CURRENCY = 'USD';

const fromUsdToCent = amount => amount * 100;

// change these; just good for manual testing
const successPayment = data => {
  alert('Payment Successful');
  // better way to do this for sure
  window.location.href = 'success';
};

const errorPayment = data => {
  alert('Payment Error');
  // better way to do this for sure
  // change...
  window.location.href = 'success';
};

const onToken = (amount, description) => token =>
  axios
    .post(PAYMENT_SERVER_URL, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromUsdToCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment);

const Checkout = ({ name, description, amount }) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={fromUsdToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
    successUrl="http://www.google.com"
  />
);

export default Checkout;
