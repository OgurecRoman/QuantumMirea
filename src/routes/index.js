"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_js_1 = require("./user.js");
var configuration_js_1 = require("./configuration.js");
var router = (0, express_1.Router)();
router.use('/user', user_js_1.default);
router.use('/configurations', configuration_js_1.default);
exports.default = router;
