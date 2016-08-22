'use strict';
module.exports = function(sequelize, DataTypes) {
  var categoriesTweets = sequelize.define('categoriesTweets', {
    categoryId: DataTypes.INTEGER,
    tweetId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return categoriesTweets;
};