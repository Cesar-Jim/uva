'use strict';
module.exports = (sequelize, DataTypes) => {
  var Wine = sequelize.define('Wine', {
    name: DataTypes.STRING,
    country: DataTypes.STRING,
    picture: DataTypes.BLOB,
    price: DataTypes.FLOAT,
    variety: DataTypes.STRING,
    alcohol: DataTypes.FLOAT
  }, {});
  Wine.associate = function(models) {
    // associations can be defined here
  };
  return Wine;
};