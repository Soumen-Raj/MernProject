const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

dotenv.config({path: './config.env'});

// Linking the DataBAse or DB file 
require('./DB/connection');

app.use(express.json());

const PORT = process.env.PORT;

// Linking the Route file
app.use(require('./Route/authentication'));

// app.get('/about', (req, res) =>{
//     res.send("Hello about page from server")
// });
// app.get('/signup', (req, res) => {
//     res.send(`Hello Registration world from the server`);
// });

// app.get('/contact', (req, res)=>{
//     res.send('Hello World 555')
// });
// app.get('/signin', (req, res)=>{
//     res.send('Hello World signin page')
// });

app.listen(PORT, ()=>{
    console.log(`My server is running successfully at port ${PORT}`)
});