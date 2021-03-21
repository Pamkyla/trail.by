"use strict";

let express = require("express");
let router = express.Router();
let getComments = require("../controllers/getComments.comtroller");

router.get("/", getComments);

module.exports = router;
