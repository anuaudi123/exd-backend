const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { apolloUploadExpress } = require('apollo-upload-server');
const { mongoose } = require('./config/db_connect');
var { errorType } = require("./utils/customError");
const { app_config } = require('./config');
// Importing InApp modules
const schema = require('./schemas/index');
var authorize = require('./routes/authorize');
var checkAuth = require('./middleware/checkAuth');
var syncUser = require('./routes/syncUser');

console.log(schema);
// Initializing
const PORT = app_config.port;
const app = express();

app.use(cors());

app.use('/authorize', authorize);

app.use('/syncUser', syncUser);

// app.use(checkAuth);

app.use(express.static('uploads'));

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));

app.use('/graphql',
   bodyParser.json(),
   apolloUploadExpress({
        uploadDir:  "./"
    }),
    (req, res, next) => {
        const context = { session: req.cookies }
        graphqlExpress({
            schema,
            context: { req, res },
            formatError(err) {
                error_details =  err.originalError ? err.originalError : err
                err_code = errorType[error_details.name] ? errorType[error_details.name].code : 500
                return {
                    message: error_details.message,
                    type: error_details.name,
                    statusCode: err_code,
                    locations: err.locations,
                    path: err.path
                };
            }
        })(req, res, next)
    }
);

app.listen(PORT, () => console.log(`Express server running on port ${PORT}`));