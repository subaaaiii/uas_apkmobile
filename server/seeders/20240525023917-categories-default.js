"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "adventure",
          image: "adventure.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "comic",
          image: "comic.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "drama",
          image: "drama.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "fantasy",
          image: "fantasy.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "horror",
          image: "horror.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "mystery",
          image: "mystery.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "romance",
          image: "romance.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "sci-fi",
          image: "sci-fi.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
