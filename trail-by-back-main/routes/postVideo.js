"use strict";

let express = require("express");
let router = express.Router();
let postVideo = require("../controllers/postVideo.controller");

router.get("/", postVideo);

module.exports = router;
