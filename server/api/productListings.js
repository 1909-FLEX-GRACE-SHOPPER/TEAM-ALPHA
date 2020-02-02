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

router.put('/:id', (req, res, next) => {
  console.log('req.params.id inside productListings API', req.params.id);
  console.log('req.body', req.body);
  const updatedItems = {};
  const bodyKeys = Object.keys(req.body);
  bodyKeys.forEach(key => {
    if (req.body[key]) {
      updatedItems[key] = req.body[key];
    }
  });
  console.log('updatedItems', updatedItems);
  // add values to updatedItems from req.body if they are not empty
  ProductListings.findByPk(req.params.id)
    .then(updatedProduct => {
      if (updatedProduct) {
        updatedProduct.update(updatedItems);
        return res.status(202).send(updatedProduct);
      }
      res.status(404);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});
module.exports = router;
