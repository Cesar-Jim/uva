"use strict";
module.exports = (sequelize, DataTypes) => {
  var Wine = sequelize.define(
    "Wine",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false
      },
      picture: {
        type: DataTypes.BLOB("long"),
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      variety: {
        type: DataTypes.STRING,
        allowNull: false
      },
      alcohol: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
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
      }
    },
    {}
  );
  Wine.associate = function(models) {
    // associations can be defined here

    Wine.hasMany(models.Rating, {
      foreignKey: "wineId",
      as: "ratings"
    });
  };
  return Wine;
};
