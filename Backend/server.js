const dotenv =require ("dotenv");
dotenv.config();
const express = require("express");
const app = require ("./src/app.js");
const connectDB = require("./src/config/DB.js");

connectDB();

app.listen(3000,() =>{
    console.log("Server is running on port 3000");
});