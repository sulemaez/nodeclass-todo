//create a router instance from express
const express = require('express')
const router = express.Router()
const auth = require('../auth/auth')

//require our controller
const con = require('../contollers.js/controller')

//login router
router.post('/login',con.login)

//register route
router.post('/signup',con.signup)

//end point to get list of a user
router.get('/list',auth.auth,con.getItems)

module.exports = router