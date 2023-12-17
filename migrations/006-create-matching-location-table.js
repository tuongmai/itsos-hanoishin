module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('matching_location', {
      matching_location_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Set auto-increment
        allowNull: false
      },
      matching_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'matching_tour', // 'matching_tour' refers to table name
          key: 'matching_id', // 'matching_id' refers to column name in matching_tour table
        },
        allowNull: false
      },
      location_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'location', // 'location' refers to table name
          key: 'location_id', // 'location_id' refers to column name in location table
        },
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('matching_location');
  }
 };
 