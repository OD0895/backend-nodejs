const express = require('express');
const app = express();
const cors = require('cors');

const { config } = require('./config/index');
const moviesApi = require('./routes/movies.js');
const userMoviesApi = require('./routes/userMovies.js');

const {
  logErrors,
  errorHandler,
  wrapErrors
} = require('./utils/middleware/errorHandlers.js');

const notFoundHandler = require('./utils/middleware/notFoundHandler');
//cors 
app.use(cors())

//para habilitar CORS para los request especificos de un cliente en produccion
//const corsOptions = { origin: "http://example.com" };
//app.use(cors(corsOptions));


// body parser
app.use(express.json());

//Routes
moviesApi(app);
userMoviesApi(app);

//Catch 4040
app.use(notFoundHandler);

//Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});