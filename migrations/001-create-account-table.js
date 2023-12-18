module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('account', {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Set auto-increment
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        defaultValue: null
      },
      address: {
        type: DataTypes.STRING,
        defaultValue: null
      },
      description: {
        type: DataTypes.STRING,
        defaultValue: null
      },
      avatar: {
        type: DataTypes.STRING,
        defaultValue: null
      },
      role: {
        type: DataTypes.ENUM('日本人', 'ツアーガイド', '管理者')
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
    await queryInterface.dropTable('account');
  }
};