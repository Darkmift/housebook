const { Router } = require('express');
const router = Router();

const { getById, list } = require('./house.controller');

router.get('/', list);
router.get('/:_id', getById);

module.exports = router;
