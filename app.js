//get express and create an instance
const express = require('express')
const app = express()

//Parse incoming request bodies in a middleware before your handlers, available under the req.body property
const bodyParser = require('body-parser')
app.use(bodyParser.json()) //parse type application/json

//require our db module
let db = require('./db/db')

//set our db to be used globally
global.db = db

//require our router
const router = require('./routes/routes')

let port = 3000

//set the path to static files
app.use(express.static(__dirname+'/public/'))

//use our router
app.use(router)


app.listen(port, () => {
    console.log(`Server started on ${port}`);
})