module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('tour_guide_location', {
      tour_guide_location_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Set auto-increment
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
      tour_guide_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'account', // 'account' refers to table name
          key: 'user_id', // 'user_id' refers to column name in account table
        },
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('tour_guide_location');
  }
 };