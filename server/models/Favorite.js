'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Favorite extends Model {
    static associate(models) {
      Favorite.belongsTo(models.Book, { foreignKey: { name: 'id_book' } });
      Favorite.belongsTo(models.User, { foreignKey: { name: 'id_user' } });
    }
  }

  Favorite.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Favorite',
      tableName: 'favorite',
    }
  );

  return Favorite;
};
