module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('account', {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastname: {
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
        allowNull: false
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
        type: DataTypes.STRING,
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
    await queryInterface.dropTable('account');
  }
};