'use strict';
module.exports = function(sequelize, DataTypes) {
  var tweet = sequelize.define('tweet', {
    username: DataTypes.STRING,
    handle: DataTypes.STRING,
    tweet: DataTypes.TEXT,
    timestamp: DataTypes.STRING,
    image: DataTypes.TEXT,
    url: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
      models.tweet.belongsToMany(models.category, {through: models.categoriesTweets});
      }
    }
  });
  return tweet;
};