var express = require('express');
var router = express.Router();

/* monitor file index page */
router.get('/monitor-file', function(req, res, next) {

  res.render('files/file-monitor', { title: 'Express' });
});

module.exports = router;
