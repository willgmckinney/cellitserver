let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let User = sequelize.import('../models/user');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let validate = require('../middleware/auth');

router.post('/signup', function(req, res) {
  User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 13),
    street: req.body.street,
    city: req.body.city,
    zip: req.body.zip,
    phone: req.body.phone,
    admin: req.body.admin
  }).then(
    function createSuccess(user) {
      let token = jwt.sign({ id: user.id }, process.env.JWT, {
        expiresIn: 60 * 60 * 24
      });

      res.json({
        user: user,
        message: 'created',
        sessionToken: token
      });
    },
    function createError(err) {
      res.send(500, err.message);
    }
  );
});

router.post('/signin', function(req, res) {
  User.findOne({ where: { email: req.body.email } }).then(function(user) {
    if (user) {
      bcrypt.compare(req.body.password, user.password, function(err, matches) {
        if (matches) {
          let token = jwt.sign({ id: user.id }, process.env.JWT, {
            expiresIn: 60 * 60 * 24
          });
          res.json({
            user: user,
            message: 'succesfully authenticated',
            sessionToken: token
          });
        } else {
          res.status(502).send({ error: 'Password' });
        }
      });
    } else {
      res.status(502).send({ error: 'Username' });
    }
  });
});


router.get('/', validate, function(req, res) {
  User.findOne({ where: { id: req.user.id }, include: ['cart', 'order'] }).then(
    function findAllSuccess(data) {
      res.json(data);
    },
    function findAllError(err) {
      res.send(500, err.message);
    }
  );
});

router.get('/allusers', function(req, res) {
  User.findAll({include: 'order'}).then(
    function findAllSuccess(data) {
      res.json(data);
    },
    function findAllError(err) {
      res.send(500, err.message);
    }
  );
});

module.exports = router;
