const router = require('express').Router();
const { Orders, Users, OrderItems } = require('../db/index');

router.get('/', (req, res, next) => {
  Orders.findAll()
    .then(orders => res.send(orders))
    .catch(e => {
      console.error(e);
      next(e);
    });
});
//i have to comment out this part bc if we want to have the user info in the order we need to add another associate. orders.belongsTo(users)

router.get('/:id', (req, res, next) => {
  Orders.findByPk(req.params.id, {
    include: [
      {
        model: OrderItems,
        as: 'orderItems'
      }
    ]
  })

    .then(found => {
      if (!found) res.status(404).send('Order is not found!');
      res.send(found);
    })
    .catch(e => {
      console.log('Error in get router');
      next(e);
    });
});

router.post('/', (req, res, next) => {
  Orders.create(req.body)
    .then(newOrder => res.status(201).send(newOrder))
    .catch(e => {
      console.error(e);
      next(e);
    });
});

router.put('/:id', (req, res, next) => {
  Orders.findByPk(req.params.id)
    .then(found => {
      if (!found) res.status(404).send('not found!');
      found.update(req.body).then(order => res.status(202).send(order));
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});
router.delete('/:id', (req, res, next) => {
  Orders.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(numDeleteRows => res.status(204).send('Delete successful!'))
    .catch(e => {
      console.log('Error in Delete router!');
      next(e);
    });
});
module.exports = router;
