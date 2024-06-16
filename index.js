"use strict"

// built-in node modules ====================
const fs = require('node:fs');
const zlib = require('node:zlib');
const crypto = require('node:crypto');
const path = require('node:path');

// imports ====================
const express = require("express");
const app = express();
const router = express.Router();

require("dotenv").config(/* {path:"/.env"} */);

const ejs = require("ejs");

const compression = require("compression");


/* socket.io: ===
const io =  require('socket.io')(http,{
  cors: {origin: "*"}
});
module.exports = io;
*/

// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");
// const mongoose = require("mongoose");


// imports ====================

const PORT = process.env.PORT || 4477;

app.get("/",(req,res)=>{
    console.log("get request")
    res.send("hi")
})

app.listen(PORT, function () {
    console.log("WHAT THE SIGMA:      http://localhost:" + PORT);
  });
  