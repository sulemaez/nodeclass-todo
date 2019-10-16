//create a router instance from express
const express = require('express')
const router = express.Router()

//require our controller
const con = require('../contollers.js/controller')

//login router
router.post('/login',con.login)

//end point to get list of a user
router.get('/list',con.getItems)

module.exports = router