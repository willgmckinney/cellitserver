let router = require('express').Router();
let sequelize = require('../db');
let Orderitem = sequelize.import('../models/orderitem');
let Order = sequelize.import('../models/order')

router.post('/create', function (req, res) {
    Order.findOne({where: {userId: req.user.id}}).then( data =>
    Orderitem.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        weight: req.body.weight,
        onsale: req.body.onsale,
        orderId: data.id
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

router.get('/allitems/:id', function (req, res) {
    Orderitem.findAll({
        where: {orderId: req.params.id}, include: 'order'
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
    Orderitem.destroy({
        where: {orderId: req.params.id}
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
    Orderitem.update({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        weight: req.body.weight,
        onsale: req.body.onsale
    }, {where: {orderId: req.params.id}})
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