const mongoose=require('mongoose');
require('dotenv').config();
const mongo=process.env.MONGODB;

const initializeDatabase=async()=>{
    await mongoose.connect(mongo).then(()=>console.log('Database connected')).catch(error=>console.log("Error occur while connecting to database."))
}

module.exports={initializeDatabase};