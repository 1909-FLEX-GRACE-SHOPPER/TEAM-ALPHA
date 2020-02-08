const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === 'production'
    ? 'pk_test_Ul901NlqkeQVqQ4UIYmeagMA00Y3LBjYHE'
    : 'pk_test_Ul901NlqkeQVqQ4UIYmeagMA00Y3LBjYHE';

export default STRIPE_PUBLISHABLE;
