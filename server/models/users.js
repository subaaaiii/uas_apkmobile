const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
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
                return `http://10.0.2.2:1000/images/user/${this.getDataValue(
                    "profilepicture"
                )}`;
            },
        },
    }, {
        tableName: 'users'
    }
    );

    return User;
}