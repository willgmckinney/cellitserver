let router = require('express').Router();
let sequelize = require('../db');
let Cartitem = sequelize.import('../models/cartitem');
let Cart = sequelize.import('../models/cart');

router.post('/create', function (req, res) {
    Cart.findOne({where: {userId: req.user.id}}).then(data =>
    Cartitem.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        weight: req.body.weight,
        onsale: req.body.onsale,
        cartId: data.id
    })).then(
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

router.get('/:id', function (req, res) {
    Cartitem.findAll({
        where: {cartId: req.params.id}, include: ['cart']
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
    Cartitem.destroy({
        where: {id: req.params.id}
    }).then(
        function deleteSuccessLog() {
            res.send('you removed a log');
        },
        function deleteLogError(err) {
            res.send(500, err.message);
        }
    );
});

router.put('/update/:id', function (req, res) {
    Cartitem.update({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        weight: req.body.weight,
        onsale: req.body.onsale
    }, {where: {id: req.params.id}})
    .then(
        function updateValid(updatedpost){
        res.json({updatedpost: updatedpost})}
    ).catch(
        function updateInvalid(err) {
        res.send(err)
        }
    )
})


module.exports = router