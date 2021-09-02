const express = require('express')
const router = express.Router()

router.get('/', function(req, res, next) {
		res.render('drag1',{title: 'Express'})

})

module.exports = router