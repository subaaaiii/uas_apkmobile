'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('favorite', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
     },
     id_book: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'books', // name of the table in the database
        key: 'id',      // key in the referenced table
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    id_user: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // name of the table in the database
        key: 'id',      // key in the referenced table
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
     });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('favorite');
    
  }
};
