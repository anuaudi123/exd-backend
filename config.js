// config.js
require('dotenv').config();
const env = process.env.NODE_ENV; // 'dev' or 'test' or 'prod'

const app_config = {
  hostname: process.env.APP_HOST || 'localhost',
  port: parseInt(process.env.APP_PORT) || 4000
};

const db_config = {
   host: process.env.DB_HOST || 'localhost',
   port: parseInt(process.env.DB_PORT) || 27017,
   name: process.env.DB_NAME || 'executive_dashboard_dev'
}

const config = {
  app_config,
  db_config,
  env
};


module.exports = config;