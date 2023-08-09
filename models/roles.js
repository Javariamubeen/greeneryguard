'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // roles.hasMany(models.roleClaim,{
      //   foreignKey: 'Role_id',
      //   as: 'roleClaims',
      // })
    }
  };
  roles.init({
    name: DataTypes.STRING,
    permissions: DataTypes.STRING,
    isDeleteable: {type:DataTypes.BOOLEAN,defaultValue: false,},
    isDeleted: {type:DataTypes.BOOLEAN,defaultValue: false,}
  }, {
    sequelize,
    modelName: 'roles',
  });
  return roles;
};