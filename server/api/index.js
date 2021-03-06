const router = require('express').Router();

router.use('/users', require('./users'));

// uncomment these out after these routes are written!
router.use('/products', require('./products'));
router.use('/productListings', require('./productListings'));
router.use('/orders', require('./orders'));
router.use('/categories', require('./categories'));
router.use('/orderItems', require('./orderItems'));

router.use('*', (req, res, next) => {
  const err = new Error('API route not found!');
  err.status = 404;
  next(err);
});

module.exports = router;
