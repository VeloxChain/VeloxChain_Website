"use strict"

require('dotenv').config();
var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var config    = require(path.join(__dirname, '..', 'configs', 'database.json'))[env];
config.define = {timestamps: false};
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js")
  })
  .forEach(function(file) { //import file to models module
    if (file != "auth.js") { //skip this file for oauth3.0
      var model = sequelize.import(path.join(__dirname, file))
      db[model.name] = model
    }
  })

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize

//db generate - command : sequelize-auto -o "./server/models" -d bikecoin -h localhost -u root  -e mysql
module.exports = db
