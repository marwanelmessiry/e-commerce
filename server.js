const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config({ path: 'config.env' });
const globalError = require('./MiddleWares/errorMiddleware')
const ApiError = require('./utils/ApiError')
const dbConnection = require('./config/database');
const router = require('./Routes/CatRoutes');

// Connect to the database
dbConnection();

// Create Express app
const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`mode: ${process.env.NODE_ENV}`);
}

// Routes
app.use('/api/v1/categories', router); // Added leading slash
app.all('*', (req, res, next) => {

    next(new ApiError("message", StatusCode))
})
app.use(globalError)
const PORT = process.env.PORT || 8000; // Default to 8000 if PORT is not set

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
process.on("unhandledRejection", err => {
    console.error(`Unhandled rejection error : ${err}`);
    process.exit(1);
})