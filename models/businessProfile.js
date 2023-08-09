'use strict';
//left join right join
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class businessProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  //initialize a model
  businessProfile.init({


    userId: DataTypes.STRING,

    name: DataTypes.STRING,
    number: DataTypes.STRING,
    created_date: {
      type: Date,
      default: Date.now
    },
    updated_date: {
      type: Date,
      default: Date.now
    },
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
      isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }

  }, {
    sequelize,
    modelName: 'businessProfile',
  });
  return businessProfile;
};
