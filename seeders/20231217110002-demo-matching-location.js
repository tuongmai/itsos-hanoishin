'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
  async up (queryInterface, Sequelize) {
    const filePath = path.join(__dirname, 'matchingLocation.json');
    const rawData = fs.readFileSync(filePath);
    const matchingLocations = JSON.parse(rawData);
    await queryInterface.bulkInsert('matching_location', matchingLocations.map(matchingLocation => ({
      ...matchingLocation,
      createdAt: new Date(),
      updatedAt: new Date(),
    })), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('matching_location', null, {});
  }
};
