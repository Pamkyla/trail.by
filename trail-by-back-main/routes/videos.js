"use strict";

let express = require("express");
let router = express.Router();
let getVideos = require("../controllers/getVideos.controller");

router.get("/", getVideos);

module.exports = router;
