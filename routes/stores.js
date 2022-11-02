const express = require('express')
const router = express.Router()
const { getStore, createStore } = require('../controllers/stores')

router.route('/').get(getStore).post(createStore)
module.exports = router