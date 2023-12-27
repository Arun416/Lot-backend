const mongoose = require('mongoose');

const dbConnect = ()=>{
    const connectionParams = {useNewUrlParser: true}

    mongoose.connect(process.env.MONGODB_URL);

    mongoose.connection.on("connected",()=>{
        console.log("Connected to database..");
    })

    mongoose.connection.on("error",(err)=>{
        console.log("Error While connecting to db!!"+err);
    })

    mongoose.connection.on("disconnected",()=>{
        console.log("Mongo db connection is disconnected!");
    })
}

module.exports = dbConnect;