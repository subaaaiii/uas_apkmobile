const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    "Book",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category2: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category3: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      pages: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cover: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
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
      images_link: {
        type: DataTypes.VIRTUAL,
        get() {
          return `http://10.0.2.2:1000/images/book/${this.getDataValue(
            "image"
          )}`;
        },
      },
    },
    {
      tableName: "books",
    }
  );

  return Book;
};
