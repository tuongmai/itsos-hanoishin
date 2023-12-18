'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
  async up (queryInterface, Sequelize) {
    const filePath = path.join(__dirname, 'tourGuideLocation.json');
    const rawData = fs.readFileSync(filePath);
    const list = JSON.parse(rawData);
    await queryInterface.bulkInsert('tour_guide_location', list.map(item => ({
      ...item,
      created_at: new Date(),
      updated_at: new Date(),
    })), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tour_guide_location', null, {});
  }
};
