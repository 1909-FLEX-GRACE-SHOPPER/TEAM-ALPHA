const router = require('express').Router();
const { OrderItems } = require('../db/index');

//NOTE: Needed to add this API in order to delete any associations with the active / "open" status cart items.

router.get('/', (req, res, next) => {
  OrderItems.findAll()
    .then(orderItems => res.send(orderItems))
    .catch(e => {
      console.error(e);
      next(e);
    });
});

router.get('/:id', (req, res, next) => {
  OrderItems.findByPk(req.params.id)
    .then(found => {
      if (!found) res.status(404).send('Item not found!');
      res.send(found);
    })
    .catch(e => {
      console.log('Error in get router');
      next(e);
    });
});

router.post('/', (req, res, next) => {
  OrderItems.create(req.body)
    .then(newItem => res.status(201).send(newItem))
    .catch(e => {
      console.log('error in posting order item', e.message);
      console.error(e);
      next(e);
    });
});

router.delete('/:id', (req, res, next) => {
  OrderItems.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => res.status(204).send('Delete successful!'))
    .catch(e => {
      console.log('Error in Delete router!');
      next(e);
    });
});
module.exports = router;
