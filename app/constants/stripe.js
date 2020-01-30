// need to provide production publishable key
const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === 'production'
    ? 'pk_live_MY_PUBLISHABLE_KEY'
    : 'pk_test_8vQmSYufq5or9inH1heMEXIX001WZn198E';

export default STRIPE_PUBLISHABLE;
