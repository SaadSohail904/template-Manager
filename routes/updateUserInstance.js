const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/updateUserInstance', function(req, res, next) {
  // res.render('index', { title: 'Testing get route' });
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ a: 1 }));
  // res.send({})
});

module.exports = router;
