const mongoose = require('mongoose');

const connectToMongo = ()=>{
    mongoose.connect(process.env.DB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(()=>{
        console.log("DB connected!")
    });

}

module.exports = connectToMongo;