const express = require("express")
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//import
const userRoutes =require('./routes/MS_user')
const authJWTRoutes =require('./routes/AuthJWT')
const scheduleRoutes =require('./routes/tr_schedule')
const projectrouted =require('./routes/ms_project')


//routes sample
app.use('/user',userRoutes)
app.use('/authJWT/',authJWTRoutes)
app.use('/schedule/',scheduleRoutes)
app.use('/project/',projectrouted)

//connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true })
let db = mongoose.connection

db.on('error',console.error.bind(console,'Databse Connection Error !!!'))
db.once('open',()=>{
    console.log('Database Is Connected')
})

//listen
app.listen(process.env.PORT,()=>{
    console.log('server running ini',process.env.PORT)
})