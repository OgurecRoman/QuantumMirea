"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var confController = require("../controllers/configuration.js");
var router = (0, express_1.Router)();
router.get('/', confController.getConfiguration);
router.post('/', confController.postConfiguration);
exports.default = router;
