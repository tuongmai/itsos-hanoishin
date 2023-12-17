'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
  async up (queryInterface, Sequelize) {
    const filePath = path.join(__dirname, 'tourGuideSkill.json');
    const rawData = fs.readFileSync(filePath);
    const skills = JSON.parse(rawData);
    await queryInterface.bulkInsert('tour_guide_skill', skills.map(skill => ({
      ...skill,
      createdAt: new Date(),
      updatedAt: new Date(),
    })), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tour_guide_skill', null, {});
  }
};
