var { Router } = require('express');
var router = Router();

router.get('/', (req, res) => {
    res.send('api working');
});

const houseRoutes = require('./api/house/house.routes');
router.use('/house', houseRoutes);

module.exports = router;
