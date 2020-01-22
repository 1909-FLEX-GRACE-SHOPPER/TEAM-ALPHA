const router = require('express').Router();
const { Products } = require('../db/index');

router.get('/', (req, res, next) => {
  Products.findAll()
    .then(products => res.send(products))
    .catch(e => {
      console.error(e);
      next(e);
    });
});
router.get('/:id', (req, res, next) => {
  Products.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(found => {
      if (!found) {
        return res.status(404).send('product not found');
      }

      res.send(found);
    })
    .catch(e => {
      res.send('internal error!');
      next(e);
    });
});
router.post('/', (req, res, next) => {
  Products.create(req.body)
    .then(newProduct => res.status(201).send(newProduct))

    .catch(e => {
      console.error(e);
      next(e);
    });
});
router.put('/:id', (req, res, next) => {
  Products.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(found => {
      if (!found) {
        return res.status(404).send('not found');
      }
      found.update(req.body).then(product => res.status(202).send(product));
    })
    .catch(e => {
      console.log('Error in put Router');
      next(e);
    });
});
router.delete('/:id', (req, res, next) => {
  Products.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(numDeleteRows => res.status(204).send('delete successful!'))
    .catch(e => {
      console.log('Error in Delete Router');
      next(e);
    });
});

module.exports = router;