var mongoose = require('mongoose');

// Importing constants
const { app_config, db_config } = require('../config');

const connectionString = `mongodb://${db_config.host}:${db_config.port}/${db_config.name}`;

mongoose.Promise = global.Promise;

mongoose.connect(connectionString);

// Export moongose module
module.exports = {
	mongoose
};
