'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Phonebooks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Phonebooks.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    avatar: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Phonebooks',
  });
  return Phonebooks;
};