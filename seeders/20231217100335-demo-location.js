'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
  async up (queryInterface, Sequelize) {
    const filePath = path.join(__dirname, 'location.json');
    const rawData = fs.readFileSync(filePath);
    const locations = JSON.parse(rawData);
    await queryInterface.bulkInsert('location', locations.map(location => ({
      ...location,
      created_at: new Date(),
      updated_at: new Date(),
    })), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('location', null, {});
  }
};
