import fs from "fs";
import path from "path";
import config from "../config/config";
import Sequelize from "sequelize";
console.log(config);
let sequelize = new Sequelize( config.db.database, config.db.username, config.db.password, config.db.opts);
let db = {};


db.sequelize = sequelize;
db.Sequelize = Sequelize;

fs.readdirSync(__dirname)
    .filter(function(file) {
        return /^(?!index|test)\w+\.js$/.test(file);
    })
    .forEach(function(file) {
        console.log(file);
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });


Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});
      
export default db;

