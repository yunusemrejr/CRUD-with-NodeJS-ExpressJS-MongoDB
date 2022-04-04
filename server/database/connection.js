/*


Mongoose is a JavaScript object-oriented programming library that creates
 a connection between MongoDB and the Express web application framework.
 
 - Wikipedia


*/

const mongoose = require('mongoose');
const connectDB = async () => {
    try{
        //mongo connection string
        const con= await mongoose.connect(process.env.MONGO_URI, {
        })
console.log(`MongoDB connected: ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);

    }
}

module.exports = connectDB