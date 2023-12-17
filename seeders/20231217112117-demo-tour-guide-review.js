'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
  async up (queryInterface, Sequelize) {
    const filePath = path.join(__dirname, 'tourGuideReview.json');
    const rawData = fs.readFileSync(filePath);
    const tourGuideReviews = JSON.parse(rawData);
    await queryInterface.bulkInsert('tour_guide_review', tourGuideReviews.map(tourGuideReview => ({
      ...tourGuideReview,
      createdAt: new Date(),
      updatedAt: new Date(),
    })), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tour_guide_review', null, {});
  }
};