let router = require('express').Router();
let sequelize = require('../db');
let Order = sequelize.import('../models/order');

router.post('/create', function(req, res) {
  Order.create({
    street: req.body.street,
    city: req.body.city,
    zip: req.body.zip,
    phone: req.body.phone,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    userId: req.user.id
  }).then(
    function createSuccess(postedinfo) {
      res.json({
        postedinfo: postedinfo
      });
    },
    function createError(err) {
      res.send(500, err.message);
    }
  );
});

router.get('/orders', function(req, res) {
  Order.findAll().then(
    function findAllSuccess(data) {
      res.json(data);
    },
    function findAllError(err) {
      res.send(500, err.message);
    }
  );
});

router.get('/allorders', function(req, res) {
  Order.findAll({
    where: { userId: req.user.id }
  }).then(
    function findAllSuccess(data) {
      res.json(data);
    },
    function findAllError(err) {
      res.send(500, err.message);
    }
  );
});

router.delete('/delete/:id', function(req, res) {
  Order.destroy({
    where: { id: req.params.id }
  }).then(
    function deleteSuccessLog() {
      res.send('you removed a log');
    },
    function deleteLogError(err) {
      res.send(500, err.message);
    }
  );
});

router.put('/update/:id', function(req, res) {
  Order.update(
    {
      street: req.body.street,
      city: req.body.city,
      zip: req.body.zip,
      phone: req.body.phone,
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      weight: req.body.weight,
      onsale: req.body.onsale
    },
    { where: { id: req.params.id } }
  )
    .then(function updateValid(updatedpost) {
      res.json({ updatedpost: updatedpost });
    })
    .catch(function updateInvalid(err) {
      res.send(err);
    });
});

module.exports = router;
