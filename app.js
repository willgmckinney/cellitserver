let express = require('express');
let app = express();
let user = require('./controllers/usercontroller');
let item = require('./controllers/itemcontroller');
let sequelize = require('./db');


sequelize.sync();
// sequelize.sync({force: true});

app.use(express.json());

app.use(require('./middleware/headers'));

app.use('/user', user);

app.use(require('./middleware/auth'));

app.use('/item', item);


app.listen(8000, function(){
    console.log('App is listening on 8000.')
});