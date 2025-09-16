"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var routes_1 = require("./routes");
var app = (0, express_1.default)();
var PORT = process.env.PORT;
app.use(express_1.default.json());
app.get('/', function (req, res) {
    res.send('Server is running! 🚀');
});
app.use('/', routes_1.default);
// Запуск сервера
app.listen(PORT, function () {
    console.log("Server is running on http://localhost:".concat(PORT));
});
