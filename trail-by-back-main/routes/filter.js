"use strict";

let express = require("express");
let router = express.Router();
let getFilters = require("../controllers/getFilter.controller");

router.get("/", getFilters);

module.exports = router;
