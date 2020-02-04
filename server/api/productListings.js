const router = require('express').Router();
const { ProductListings } = require('../db/index');
router.post('/', (req, res, next) => {
  ProductListings.create(req.body)
    .then(newProduct => res.status(201).send(newProduct))
    .catch(e => {
      console.error(e);
      next(e);
    });
});

module.exports = router;
