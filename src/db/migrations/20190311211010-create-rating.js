"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Ratings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      },
      wineId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        allowNull: false,
        references: {
          model: "Wines",
          key: "id",
          as: "wineId"
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Ratings");
  }
};
