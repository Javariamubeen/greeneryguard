'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.enquiries, {
        foreignKey: "id"
      })
      this.hasMany(models.order, {
        foreignKey: "id"
      })
      this.hasMany(models.products, {
        foreignKey: "id"
      })
    }
  };
  users.init({
    email: DataTypes.STRING,
    abn: DataTypes.STRING,
    business_name: DataTypes.STRING,
    business_address: DataTypes.STRING,
    username: {
      type: String,
    },
    normalised_username: {
      type: String
    },
    normalised_email: {
      type: String
    },
    security_stamp: {
      type: String
    },
    concurrency_stamp: {
      type: String
    },
    phone_number: {
      type: String,
    },
    phone_number_confirmed: {
      type: Boolean,
      default: false
    },
    two_factor_enabled: {
      type: Boolean
    },
    lockoutend: {
      type: Boolean
    },
    lockoutend_enabled: {
      type: Boolean
    },
    access_fail_count: {
      type: Number
    },
    primary_role: {
      type: String,
      required: true
    },
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    password_hash:DataTypes.STRING,
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
      
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};
