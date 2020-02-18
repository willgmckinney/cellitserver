let router = require('express').Router();
let sequelize = require('../db');
let Item = sequelize.import('../models/item');

router.post('/create', function (req, res) {
    Item.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        weight: req.body.weight,
        catagory: req.body.catagory,
        onsale: req.body.onsale,
        sold: req.body.sold,
        poster: req.user.id
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

router.get('/allitems', function (req, res) {
    Item.findAll({
        where: {poster: req.user.id}
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
    Item.destroy({
        where: {id: req.params.id, poster: req.user.id}
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
    Item.update({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        weight: req.body.weight,
        catagory: req.body.catagory,
        onsale: req.body.onsale,
        sold: req.body.sold
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