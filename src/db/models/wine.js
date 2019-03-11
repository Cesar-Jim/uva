"use strict";
module.exports = (sequelize, DataTypes) => {
  var Wine = sequelize.define(
    "Wine",
    {
      name: DataTypes.STRING,
      country: DataTypes.STRING,
      picture: DataTypes.BLOB("long"),
      price: DataTypes.FLOAT,
      variety: DataTypes.STRING,
      alcohol: DataTypes.FLOAT,
      poq: DataTypes.INTEGER,
      body: DataTypes.INTEGER,
      taste: DataTypes.INTEGER,
      looks: DataTypes.INTEGER,
      comments: DataTypes.TEXT,
      avgRating: DataTypes.FLOAT
    },
    {}
  );
  Wine.associate = function(models) {
    // associations can be defined here
  };
  return Wine;
};
