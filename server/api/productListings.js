const router = require('express').Router();
const {
  Products,
  ProductListings,
  Colors,
  Categories
} = require('../db/index');

router.post('/', (req, res, next) => {
  ProductListings.create(req.body)
    .then(newProduct => res.status(201).send(newProduct))
    .catch(e => {
      console.error(e);
      next(e);
    });
});

router.put('/editproduct', (req, res, next) => {
  const productListingId = req.body.productListingId;
  const productId = req.body.productId;
  const { edits } = req.body;

  const productListingKeys = {
    name: true,
    description: true,
    imageUrl: true
  };

  const productKeys = {
    gender: true,
    size: true,
    quantity: true,
    price: true,
    colorId: true
  };

  const updatedProdListings = {};
  const updatedProduct = {};

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

    // update productlisting
  });
  ProductListings.findByPk(productListingId)
    .then(foundProductListingsToUpdate => {
      if (foundProductListingsToUpdate) {
        foundProductListingsToUpdate.update(updatedProdListings, {
          where: { id: productListingId },
          returning: true
        });
      }
    })
    .then(() => {
      return Products.findByPk(productId, {
        //include: [{ model: ProductListings }]
      });
    })
    .then(foundProductToUpdate => {
      return foundProductToUpdate.update(updatedProduct);
      /* {
        //where: { id: productId },
        include: [ProductListings],
        //returning: true,
        //raw: true
      });
      */
    })
    .then(updatedProduct => {
      return Products.findByPk(productId, {
        include: [ProductListings, Colors, Categories]
      });
      // console.log(
      //   '************updated product',
      //   updatedProduct.productListings
      // );
    })
    .then(updatedProd => {
      console.log('************updated product', updatedProd);
      res.status(201).send(updatedProd);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });

  // find product including prod listing, update, then return updated product
});

router.put('/editproductOLD', (req, res, next) => {
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
