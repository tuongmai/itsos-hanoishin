module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('tour_guide_review', {
      tour_guide_review_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Set auto-increment
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
    await queryInterface.dropTable('tour_guide_review');
  }
 };