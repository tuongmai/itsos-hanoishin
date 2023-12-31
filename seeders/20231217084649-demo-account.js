'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
  async up (queryInterface, Sequelize) {
    const filePath = path.join(__dirname, 'accounts.json');
    const rawData = fs.readFileSync(filePath);
    const accounts = JSON.parse(rawData);
    await queryInterface.bulkInsert('account', accounts.map(account => ({
      ...account,
      created_at: new Date(),
      updated_at: new Date(),
    })), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('account', null, {});
  }
};
