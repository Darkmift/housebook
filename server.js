const result = require('dotenv').config();
if (result.error) {
    throw result.error;
}

const express = require('express');
const cors = require('cors');
const config = require('./config');
const { errorHandler } = require('./middleware/errorHandler.middleware');
const Logger = require('./services/logger.service');
const app = express();

const corsOptions = {
    origin: config.origin,
    credentials: true,
};

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    app.use(cors(corsOptions));
}

const mainRouter = require('./main.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'Hello' });
});

app.use('/api', mainRouter);

// global error handler
app.use(errorHandler);
process
    .on('unhandledRejection', (reason, p) => {
        Logger.error(reason, 'Unhandled Rejection at Promise', p);
    })
    .on('uncaughtException', (err) => {
        Logger.error(err, 'Uncaught Exception thrown');
        process.exit(1);
    });

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    Logger.info('Server listening on port: ' + PORT);
    Logger.info('NODE_ENV' + process.env.NODE_ENV);
});
