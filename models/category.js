'use strict';
module.exports = function(sequelize, DataTypes) {
  var category = sequelize.define('category', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.category.hasMany(models.tweet);
        models.category.belongsTo(models.user);
      }
    }
  });
  return category;
};