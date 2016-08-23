'use strict';
module.exports = function(sequelize, DataTypes) {
  var category = sequelize.define('category', {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
      models.category.belongsToMany(models.tweet, {through: models.categoriesTweets});
      models.category.belongsTo(models.user);
      }
    }
  });
  return category;
};