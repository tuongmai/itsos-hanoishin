'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
  async up (queryInterface, Sequelize) {
    const filePath = path.join(__dirname, 'matching.json');
    const rawData = fs.readFileSync(filePath);
    const matchings = JSON.parse(rawData);
    await queryInterface.bulkInsert('matching_tour', matchings.map(matching => ({
      ...matching,
      createdAt: new Date(),
      updatedAt: new Date(),
    })), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('matching_tour', null, {});
  }
};
