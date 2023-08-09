'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roleClaim extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // roleClaim.belongsTo(models.roles, {
      //   foreignKey: 'Role_id',
      //   onDelete: 'CASCADE',
      // });
    }
  };
  roleClaim.init({

    claimType: DataTypes.STRING,
    claimValue: DataTypes.STRING,
    // Role_id:DataTypes.Number,

    isDeleteable: {type:DataTypes.BOOLEAN,defaultValue: false,},
    isDeleted: {type:DataTypes.BOOLEAN,defaultValue: false,}
  }, {
    sequelize,
    modelName: 'roleClaim',
  });
  return roleClaim;
};
