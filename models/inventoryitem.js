module.exports = function (sequelize, DataTypes) {
    return sequelize.define('inventoryitem', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        weight: {
            type: DataTypes.INTEGER,
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
            type: DataTypes.INTEGER,
            allowNull: false
        },
        poster: DataTypes.INTEGER
    });
};