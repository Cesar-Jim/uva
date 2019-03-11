"use strict";
module.exports = (sequelize, DataTypes) => {
  var Rating = sequelize.define(
    "Rating",
    {
      poq: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      body: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      taste: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      looks: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      comments: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      avgRating: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      wineId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  Rating.associate = function(models) {
    // associations can be defined here

    Rating.belongsTo(models.Wine, {
      foreignKey: "wineId",
      onDelete: "CASCADE"
    });
  };
  return Rating;
};
