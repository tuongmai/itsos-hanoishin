module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('matching_tour', {
      matching_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Set auto-increment
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
      tour_guide_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'account', // 'account' refers to table name
          key: 'user_id', // 'user_id' refers to column name in account table
        },
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      is_deleted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      deleted_by: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      matching_date: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('matching_tour');
  }
 };