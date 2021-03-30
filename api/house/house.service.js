const mongoService = require('../../services/mongo.service');
const HOUSE_COLLECTION = 'house';

async function getById(id) {
    const db = await mongoService.connect();
    return await db
        .collection(HOUSE_COLLECTION)
        .findOne(mongoService.ObjectId(id));
}

async function list(filters) {
    // TODO:implement aggregation by filters
    filters = [{ $match: { name: { $exists: true } } }];
    const db = await mongoService.connect();
    return await db.collection(HOUSE_COLLECTION).aggregate().toArray(); //works
    // return await db.collection(HOUSE_COLLECTION).find().toArray();//works
}

module.exports = {
    getById,
    list,
};
