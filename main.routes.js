var { Router } = require('express');
var router = Router();

router.get('/', (req, res) => {
    res.send('api working');
});

module.exports = router;
