module.exports = function (sequelize, DataTypes) {
    return sequelize.define('item', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.STRING,
            allowNull: false
        },
        weight: {
            type: DataTypes.STRING,
            allowNull: false
        },
        catagory: {
            type: DataTypes.STRING,
            allowNull: false
        },
        onsale: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sold: {
            type: DataTypes.STRING,
            allowNull: false
        },
        poster: DataTypes.INTEGER
    });
};