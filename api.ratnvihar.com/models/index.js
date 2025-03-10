'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV;
// const config = require(__dirname + '/../config/config.json')[env];
const db = {};


// const { Sequelize } = require('sequelize');

const config = {
  use_env_variable: false, // Set to 'DATABASE_URL' if using an environment variable
  database: 'ratnvihar',
  username: 'mysql',
  password: 'dhcnahbirpa1kmzo', // this is passowrd
  host: '147.93.110.206',
  dialect: 'mysql',
  port: 3306,
  logging: false, // Enable for debugging SQL queries
  dialectOptions: {
    connectTimeout: 10000, // Set timeout for external connections
  },
};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    logging: config.logging,
    dialectOptions: config.dialectOptions,
  });
}

// Test the connection
sequelize.authenticate()
  .then(() => console.log('✅ Connected to external MySQL database'))
  .catch((err) => console.error('❌ Unable to connect:', err));

// module.exports = sequelize;


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;

