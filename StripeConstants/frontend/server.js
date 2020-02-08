const PAYMENT_SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://team-alpha-grace-shopper.herokuapp.com/stripe'
    : 'http://localhost:3000/stripe';

export default PAYMENT_SERVER_URL;
