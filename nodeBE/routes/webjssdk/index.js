let express = require('express');
let router = express.Router();

let users = require('./users')
let events = require('./events')
let verifyparams = require('./verifyparams')


router.all('/customersinfo',users)
router.all('/logs',events)
router.all('/verifyparams',verifyparams)

module.exports = router