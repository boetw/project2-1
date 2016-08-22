'use strict';

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email address'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,99],
          msg: 'Name must be between 1 and 99 characters'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8,99],
          msg: 'password must be at least 8 characters long'
        }
      }
    }
  }, {
    hooks: {
      //(user object, options object, callback function)
      beforeCreate: function(createUser, options, cb){
        //hash password-- generate hash = hashSync(password, iterations)
        var hash = bcrypt.hashSync(createUser.password, 10);
        // reassign password to hash
        createUser.password = hash;
        //(error, user object)
        cb(null, createUser);
      }
    },
    classMethods: {
      associate: function(models) {
        models.user.hasMany(models.category);
      }
    },
    instanceMethods: {
      validPassword: function(password) {
        //take in string password and compare with user object password
        return bcrypt.compareSync(password, this.password);
      },

      //override instance method, hides hash from object 
      toJSON: function(){
        var jsonUser = this.get();
        delete jsonUser.password;
        return jsonUser;
      }

    }
  });
  return user;
};