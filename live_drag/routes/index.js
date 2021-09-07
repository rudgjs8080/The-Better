const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	res.render('index')

})

router.post('/x/p_x/y/p_y', (req, res) => {
	res.render('test1')
})
module.exports = router