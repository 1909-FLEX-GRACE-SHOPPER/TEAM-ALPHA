const router = require('express').Router();

const { Users } = require('../db/index');

router.post('/login', (req, res, next) => {
  Users.findOne({
    where: req.body
  })
    .then(userOrNull => {
      if (!userOrNull) return res.sendStatus(401);
      req.session.userId = userOrNull.id;
      if (userOrNull.userType === 'admin') {
        req.session.admin = true;
      } else {
        req.session.admin = false;
      }
      res.status(200).send(userOrNull);
    })
    .catch(next);
});

router.post('/signup', (req, res, next) => {
  Users.findOrCreate({
    where: req.body
  })
    .then(user => {
      if (!user) return res.status(500).send('error creating user');
      req.session.userId = user.id;
      if (user.userType === 'admin') {
        req.session.admin = true;
      } else {
        req.session.admin = false;
      }
      res.send(user);
    })
    .catch(next);
});

router.get('/signout', (req, res, next) => {
  delete req.session.userId;
  delete req.session.admin;
  res.sendStatus(204);
  next();
});

router.get('/me', (req, res, next) => {
  if (req.loggedIn) return res.send(req.user);
  res.status(401).send('no prior login!');
  next();
});

module.exports = router;
