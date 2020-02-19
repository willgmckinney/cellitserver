let router = require('express').Router();
let sequelize = require('../db');
let Cart = sequelize.import('../models/cart');

router.post('/create', function (req, res) {
    Cart.create({
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

router.get('/', function (req, res) {
    Cart.findAll({
        where: {userId: req.user.id}, include: 'user'
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
    Cart.destroy({
        where: {id: req.params.id, userId: req.user.id}
    }).then(
        function deleteSuccessLog() {
            res.send('you removed a log');
        },
        function deleteLogError(err) {
            res.send(500, err.message);
        }
    );
});


module.exports = router