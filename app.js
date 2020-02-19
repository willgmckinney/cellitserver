let express = require('express');
let app = express();
let user = require('./controllers/usercontroller');
let inventoryitem = require('./controllers/inventoryitemcontroller');
let cart = require('./controllers/cartcontroller');
let cartitem = require('./controllers/cartitemcontroller');
let orderitem = require('./controllers/orderitemcontroller');
let order = require('./controllers/ordercontroller');
let sequelize = require('./db');

sequelize.sync();
// sequelize.sync({force: true});

app.use(express.json());

app.use(require('./middleware/headers'));

app.use('/user', user);

app.use(require('./middleware/auth'));

app.use('/inventoryitem', inventoryitem);

app.use('/cart', cart);

app.use('/cartitem', cartitem);

app.use('/orderitem', orderitem);

app.use('/order', order);

app.listen(8000, function(){
    console.log('App is listening on 8000.')
});