module.exports = function(sequelize, DataTypes) {
    var Product = sequelize.define("Product", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        item_name: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
        location: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        img_path: {
            type: DataTypes.STRING
        }
    });

    Product.associate = function(models) {
         models.Product.belongsTo(models.User, {
             onDelete: "CASCADE",
             foreignKey: {
                 allowNull: false
             }
         });
     };

    return Product;
};