const router = require('express').Router();
const { Products } = require('../db/index');

//route to get all products in specific category
router.get('/:id', (req, res, next) => {
  Products.findAll({
    where: {
      categoryId: req.params.id
    }
  })
    .then(foundProducts => res.send(foundProducts))
    .catch(e => {
      console.error(e);
      next(e);
    });
});
module.exports = router;
