require('dotenv').config()
const Sequelize = require('sequelize');

const sequelize = new Sequelize('cellit', 'postgres', process.env.PASSWORD, {
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

module.exports = sequelize;