var express = require("express");
var router = express.Router();

router.get("/testEndpoint", (req, res)=>{

    res.send("Hello test :D")
});

module.exports = router;