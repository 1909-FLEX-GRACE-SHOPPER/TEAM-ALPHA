// CHANGE FOR PRODUCTION

// server url *may* be wrong if we can't have backend and frontend on same
// should be fine?
const PAYMENT_SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://myapidomain.com'
    : 'http://localhost:3000';

export default PAYMENT_SERVER_URL;
