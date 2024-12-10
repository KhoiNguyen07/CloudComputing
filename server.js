const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const app = express();
const path = require('path')
const cors = require('cors');

const connectDB = require('./server/database/connection')


dotenv.config({path: 'config.env'})
const PORT = process.env.PORT || 8080 
connectDB()

app.use(cors({
    origin: 'https://cloudcomputing-r4gy.onrender.com', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
  }));



// log requests
app.use(morgan('tiny'))
// parse requess to body-parser
app.use(bodyparser.urlencoded({extended: true}))
// set view engine
app.set('view engine','ejs')
// app.set('views',path.resolve(__dirname,'views/ejs'))

// load assets
app.use('/css',express.static(path.resolve(__dirname,'assets/css')))
app.use('/img',express.static(path.resolve(__dirname,'assets/img')))
app.use('/js',express.static(path.resolve(__dirname,'assets/js')))




//load router
app.use('/', require('./server/routes/router'))

app.listen(3000, ()=> {
    console.log('server is runing on http://localhost:3000')
})