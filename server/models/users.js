'use strict';
const { DataTypes,Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
          User.hasMany(models.Favorite, { foreignKey: { name: 'id_user' } });
        }
      }
    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dateofbirth: {
            type: DataTypes.DATE
        },
        profilepicture: {
            type: DataTypes.STRING,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        refreshToken: {
            type: DataTypes.TEXT
        },
        images_link: {
            type: DataTypes.VIRTUAL,
            get() {
                return `https://bookshelf-c8lx.onrender.com/images/user/${this.getDataValue(
                    "profilepicture"
                )}`;
            },
        },
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users'
    }
    );

    return User;
}