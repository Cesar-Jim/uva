"use strict";

const faker = require("faker");

let wines = [];

for (let i = 1; i <= 2; i++) {
  wines.push({
    name: faker.commerce.productName(),
    country: faker.address.country(),
    picture: faker.image.image(),
    price: faker.commerce.price(),
    variety: faker.commerce.color(),
    alcohol: faker.random.number(),
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert("Wines", wines, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete("Wines", null, {});
  }
};
