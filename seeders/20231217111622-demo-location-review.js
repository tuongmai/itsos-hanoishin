'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
  async up (queryInterface, Sequelize) {
    const filePath = path.join(__dirname, 'locationReview.json');
    const rawData = fs.readFileSync(filePath);
    const locationReviews = JSON.parse(rawData);
    await queryInterface.bulkInsert('location_review', locationReviews.map(locationReview => ({
      ...locationReview,
      created_at: new Date(),
      updated_at: new Date(),
    })), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('location_review', null, {});
  }
};
