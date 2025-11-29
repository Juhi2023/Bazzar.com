const dotenv = require("dotenv");
dotenv.config()
const connectToMongo = require("./src/config/db");
const app =  require("./src/app");

//handling uncaught Exception
process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down server due to uncaught exception.`);

    process.exit(1)
})

//config

//connection to database 
connectToMongo()



const server = app.listen(process.env.PORT, ()=>{
    console.log(`server is running at port ${process.env.PORT}`)
})

// unhandled promise rejection
process.on("unhandledRejection", err =>{
    console.log(err)
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down server due to unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1)
    })
})
