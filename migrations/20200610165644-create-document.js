'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Documents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gId: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      language: {
        type: Sequelize.STRING
      },
      authors: {
        type: Sequelize.STRING
      },
      publicationDate: {
        type: Sequelize.DATEONLY
      },
      subjects: {
        type: Sequelize.STRING
      },
      licenseRights: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Documents');
  }
};