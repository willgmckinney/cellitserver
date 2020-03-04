require('dotenv').config()
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to postgres database');
    },
    function(err){
        console.log(err);
    }
);

User = sequelize.import('./models/user');
Cart = sequelize.import('./models/cart');
Cartitems = sequelize.import('./models/cartitem');
Order = sequelize.import('./models/order');
Orderitems = sequelize.import('./models/orderitem')


Cartitems.belongsTo(Cart);
Cart.hasMany(Cartitems);

User.hasOne(Cart);
Cart.belongsTo(User);

User.hasOne(Order);
Order.belongsTo(User);

Orderitems.belongsTo(Order);
Order.hasMany(Orderitems);


module.exports = sequelize;