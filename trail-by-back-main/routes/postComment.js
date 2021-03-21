"use strict";

let express = require("express");
let router = express.Router();
let putComment = require("../controllers/postComment.controller");

router.get("/", putComment);

module.exports = router;
