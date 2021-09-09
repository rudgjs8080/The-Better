var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  // Express를 ejs 에서 <%= title %> 로 받아서 쓴다
});

module.exports = router;
