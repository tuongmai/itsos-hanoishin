module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('tour_guide_skill', {
      skill_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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
      skill: {
        type: DataTypes.STRING,
        allowNull: false
      },
      skill_detail: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('tourGuideSkill');
  }
 };
 