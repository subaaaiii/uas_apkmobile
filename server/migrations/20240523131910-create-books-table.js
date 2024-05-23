'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.createTable('books', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
     },
     name:{
      type: Sequelize.STRING,
      allowNull: false
     },
     author:{
      type: Sequelize.STRING,
      allowNull: false
     },
     category1:{
      type: Sequelize.STRING,
      allowNull: false
     },
     category2:{
      type: Sequelize.STRING,
      allowNull: false
     },
     category3:{
      type: Sequelize.STRING,
      allowNull: false
     },
     rating:{
      type: Sequelize.FLOAT,
      allowNull: false
     },
     rating:{
      type: Sequelize.INTEGER,
      allowNull: false
     },
     cover:{
      type: Sequelize.STRING,
      allowNull: false
     },
     year:{
      type: Sequelize.INTEGER,
      allowNull: false
     },
     description:{
      type: Sequelize.TEXT,
      allowNull: false
     },
     createdAt: {
      type: Sequelize.DATE,
      allowNull: false
     },
     updatedAt: {
      type: Sequelize.DATE,
      allowNull: false
     }
     });
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('books');
  }
};
