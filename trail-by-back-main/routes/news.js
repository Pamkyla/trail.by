"use strict";

let express = require("express");
let router = express.Router();
let getNews = require("../controllers/getNews.controller");

router.get("/", getNews);

module.exports = router;
