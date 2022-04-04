/*


Mongoose is a JavaScript object-oriented programming library that creates
 a connection between MongoDB and the Express web application framework.
 
 - Wikipedia


*/


const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name:{
        type: String,
        require:true
    },
    email: {
        type: String,
        required:true,
        unique:true
    },
    gender: String,
    status: String
})

const Userdb = mongoose.model('userdb',schema);
module.exports=Userdb;