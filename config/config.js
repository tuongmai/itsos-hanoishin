require('dotenv').config();
const parseDbUrl = require("parse-database-url");
const dbConfig = parseDbUrl(process.env.DATABASE_URL);

const db_env = {
  development: {
    username: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    host: dbConfig.host,
    dialect: dbConfig.driver,
    port: dbConfig.port,
  },
  staging: {
    username: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    host: dbConfig.host,
    dialect: dbConfig.driver,
    port: dbConfig.port,
  },
  test: {
    username: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    host: dbConfig.host,
    dialect: dbConfig.driver,
    port: dbConfig.port,
  },
  production: {
    username: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    host: dbConfig.host,
    dialect: dbConfig.driver,
    port: dbConfig.port,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
module.exports = db_env;