// this is going to be the entering point of API
// const express = require('express')
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import {connectDB}  from './config/db.js';
import productRoutes from './routes/product.route.js'

dotenv.config()

const app = express();

const PORT = process.env.PORT || 5000;

const __dirname =path.resolve();
// enable CORS
app.use(cors()); //add before middleware

// middleware (use to parse this req from the body)
app.use(express.json()); //allow us to accept json data in the req.body
app.use(express.urlencoded({extended:false}));

app.use('/api/products', productRoutes)

//deployment code configuration
if(process.env.NODE_ENV === "production"){
    // making dist folder as a static assests
    app.use(express.static(path.join(__dirname, "/frontend/dist")))

    app.get("*", (req, res) =>{
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}


app.listen(PORT, () =>{
    connectDB();
    console.log("server started at http://localhost:"+ PORT)
})