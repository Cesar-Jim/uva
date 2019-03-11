"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Wines", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      country: {
        allowNull: false,
        type: Sequelize.STRING
      },
      picture: {
        allowNull: false,
        type: Sequelize.BLOB
      },
      price: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      variety: {
        allowNull: false,
        type: Sequelize.STRING
      },
      alcohol: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      poq: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      body: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      taste: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      looks: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      comments: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      avgRating: {
        allowNull: false,
        type: Sequelize.FLOAT
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
    return queryInterface.dropTable("Wines");
  }
};
