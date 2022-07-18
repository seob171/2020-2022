const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('server')
    // return 'server'
    // res.render('index');
});

module.exports = router;