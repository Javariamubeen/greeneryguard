'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class enquiries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.users, {
        foreignKey: "fromId"
      });
    }
  };
  enquiries.init({
    fromId: {type:DataTypes.INTEGER},
    sellerID: DataTypes.INTEGER,
    description: DataTypes.STRING,

    // newly added
    // end newly added

  }, {
    sequelize,
    modelName: 'enquiries',
  });
  return enquiries;
};
