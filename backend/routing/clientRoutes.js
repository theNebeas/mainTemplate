var express = require("express");
var router = express.Router();

router.get("/testPage", (req, res)=>{

    res.render("screens/testPage")
});

module.exports = router;