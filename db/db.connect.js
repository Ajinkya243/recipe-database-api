const mongoose=require('mongoose');
require('dotenv').config();
//const mongo=process.env.MONGODB;
const mongo="mongodb+srv://ajinkyagund2:ajinkya741@ajinkya-cluster.ccgy0.mongodb.net/?retryWrites=true&w=majority&appName=Ajinkya-Cluster"

const initializeDatabase=async()=>{
    await mongoose.connect(mongo).then(()=>console.log('Database connected')).catch(error=>console.log("Error occur while connecting to database."))
}

module.exports={initializeDatabase};