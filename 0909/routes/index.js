var express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index' );
});

module.exports = router;
