'use strict';

var Sequelize = require('sequelize');

var sequelize = new Sequelize('mainDB', null, null, {
    dialect: "sqlite",
    storage: './test.sqlite',
});

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) {
    console.log('Unable to connect to the database:', err);
  });


//  MODELS
var User = sequelize.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});


//  SYNC SCHEMA
sequelize
  .sync({ force: true })
  .then(function(err) {
    console.log('It worked!');
  }, function (err) {
    console.log('An error occurred while creating the table:', err);
  });c