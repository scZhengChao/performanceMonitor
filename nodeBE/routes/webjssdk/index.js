let express = require('express');
let router = express.Router();


let users = require('./users')
let logs = require('./logs')


router.all('/customersinfo',users)
router.all('/logs',logs)

module.exports = router