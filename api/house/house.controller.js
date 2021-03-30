const houseService = require('./house.service');
const { CustomError } = require('../../helpers/error');

async function getById(req, res, next) {
    try {
        const { _id } = req.params;
        if (!_id) {
            throw new CustomError(400, '_id required');
        }
        const house = await houseService.getById(_id);
        res.send(house);
    } catch (error) {
        next(error);
    }
}

async function list(req, res, next) {
    try {
        const { filters } = req.query;
        if (!filters) {
            throw new CustomError(400, 'Filters invalid');
        }
        const houses = await houseService.list(filters);
        res.send(houses);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getById,
    list,
};
