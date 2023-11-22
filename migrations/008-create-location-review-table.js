module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('location_review', {
      location_review_id: {
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
      jap_user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'account', // 'account' refers to table name
          key: 'user_id', // 'user_id' refers to column name in account table
        },
        allowNull: false
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('location_review');
  }
 };