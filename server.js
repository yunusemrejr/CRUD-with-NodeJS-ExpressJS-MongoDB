const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const connectDB = require('./server/database/connection');
const app = express();

dotenv.config({path: 'config.env'})
const PORT = process.env.PORT || 8080


//log requests
app.use(morgan('tiny'));
//mongo connection
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true }))

//set view engine, this is how we allow the usage of EJS
app.set("view engine","ejs")

//load assets from our assets folder which includes css, images and javascript
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootbox/dist')))


app.use('/',require('./server/routes/router'))


app.listen(PORT,()=>{console.log(`Server is running on http://localhost:${PORT}`)});