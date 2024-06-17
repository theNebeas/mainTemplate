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


// proprietary imports ====================

const { logEndpoint, devLog, checkParameters } = require("./backend/globalHelpers");
let apiPrefix = process.env.API_PREFIX || "api";

// middleware set-up ====================
app.use(express.static(__dirname + "/clientSide"));
app.use(compression());

app.use(express.json());
app.disable('x-powered-by');
app.set("views", path.join(__dirname, "/EJS_files"));
app.set("view engine", "ejs");

const PORT = process.env.PORT || 4477;

app.use((req, res, next)=>{

  res.set({
    "Author": "Nebeas",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options":"SAMEORIGIN",
    "Content-Type":"text/html;charset=UTF-8",
    "Content-Language":"en-US",
    "Content-Security-Policy":"default-src 'self'; script-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'self'",
    "Strict-Transport-Security":"max-age=31336000; includeSubDomains; preload"
  })
  
  // Headers for development
  if(process.env.DEV_MODE == "TRUE"){
    res.set({
      "Cache-Control": "no-cache",
      "Development-mode": "true",
    })
  }

  if(process.env.DEV_LOGGING == "TRUE"){
    logEndpoint(req, res, next)
  }

  next()
})

app.get("/",(req,res)=>{
    console.log("get request")
    res.render("screens/index")
})

// top-level routing ====================
const clientRoutes = require("./backend/routing/clientRoutes");
app.use("/", clientRoutes);

const apiRoutes = require("./backend/routing/apiRoutes");
app.use(`/${apiPrefix}/`, apiRoutes);

app.listen(PORT, function () {
  devLog(checkParameters.isValid(1))
  devLog("Project is live at: http://localhost:" + PORT)
});
  