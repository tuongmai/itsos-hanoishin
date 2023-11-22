module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('location', {
      location_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false
      },
      average_rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('location');
  }
 };
 