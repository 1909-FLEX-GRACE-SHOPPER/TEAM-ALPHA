const router = require('express').Router();
const { Products, ProductListings } = require('../db/index');

router.post('/', (req, res, next) => {
  ProductListings.create(req.body)
    .then(newProduct => res.status(201).send(newProduct))
    .catch(e => {
      console.error(e);
      next(e);
    });
});

router.put('/editproduct2', (req, res, next) => {
  // update productlisting
  // find product including prod listing, update, then return updated product
});
router.put('/editproduct', (req, res, next) => {
  // update productlisting
  // find product including prod listing, update, then return updated product
  const productId = req.body.productId;
  const productListingId = req.body.productListingId;
  console.log('ids', productListingId, productId);
  const productKeys = {
    gender: true,
    size: true,
    quantity: true,
    price: true,
    colorId: true
  };
  const productListingKeys = {
    name: true,
    description: true,
    imageUrl: true
  };
  const updatedProdListings = {};
  const updatedProduct = {};

  const { edits } = req.body;
  const editKeys = Object.keys(edits);
  editKeys.forEach(key => {
    if (edits[key]) {
      if (productListingKeys[key]) {
        updatedProdListings[key] = edits[key];
      }
      if (productKeys[key]) {
        updatedProduct[key] = edits[key];
      }
    }
  });
  console.log('updated items', updatedProduct, updatedProdListings);

  const prodPromises = [];
  // Work on this
  if (Object.keys(updatedProduct).length) {
    prodPromises.push(
      Products.update(updatedProduct, {
        where: { id: productId },
        returning: true
      })
    );
  } else {
    prodPromises.push(Promise.resolve(null));
  }
  if (Object.keys(updatedProdListings).length) {
    prodPromises.push(
      ProductListings.update(updatedProdListings, {
        where: { id: productListingId },
        returning: true
      })
    );
  } else {
    prodPromises.push(Promise.resolve(null));
  }

  Promise.all(prodPromises)
    .then(([prod, prodListing]) => {
      console.log('**** edit products');
      if (Array.isArray(prod)) {
        prod = prod[1][0];
      }
      if (Array.isArray(prodListing)) {
        prodListing = prodListing[1][0];
      }
      res.status(201).send({ product: prod, productListing: prodListing });
    })
    .catch(e => {
      console.error('edit product error');
      next(e);
    });
});

module.exports = router;
//res.status(201).send([prod, prodListing]
