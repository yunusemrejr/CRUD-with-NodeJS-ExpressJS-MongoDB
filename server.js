const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connectDB = require('./server/database/connection');

const app = express();

// Load environment variables
dotenv.config({path: 'config.env'})
const PORT = process.env.PORT || 8080

// Security middleware
app.use(helmet({
    contentSecurityPolicy: false, // Disable for development, enable in production with proper config
}));

// Enable CORS
app.use(cors());

// Compression middleware
app.use(compression());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Log requests
app.use(morgan('dev'));

// MongoDB connection
connectDB();

// Parse request body
app.use(bodyparser.urlencoded({ extended : true }))
app.use(bodyparser.json())

// Set view engine
app.set("view engine","ejs")

// Load static assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootbox/dist')))

// Routes
app.use('/',require('./server/routes/router'))

// 404 handler
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

app.listen(PORT,()=>{console.log(`Server is running on http://localhost:${PORT}`)});