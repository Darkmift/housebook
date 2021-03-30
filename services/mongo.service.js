const Logger = require('./logger.service');
const ObjectId = require('mongodb').ObjectId;

var dbConn = null;
var prmConn = null;
const url = process.env.MONGO_URI;
let dbName = url.substring(url.lastIndexOf('/') + 1);

function connectToMongo() {
    if (prmConn) return prmConn;
    // Reuse existing connection if exist
    if (dbConn) return Promise.resolve(dbConn);

    const MongoClient = require('mongodb').MongoClient;

    prmConn = MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((client) => {
        Logger.info('[MONGO SERVICE] new connection to db');
        prmConn = null;
        // If we get disconnected (e.g. db is down)
        client.on('close', () => {
            Logger.info('[MONGO SERVICE] MongoDB Diconnected!');
            dbConn = null;
            client.close();
        });
        dbConn = client.db();
        return dbConn;
    });
    return prmConn;
}

module.exports = {
    connect: connectToMongo,
    ObjectId,
    dbName,
};
