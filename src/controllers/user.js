"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCompositeGates = exports.patchCompositeGates = exports.postCompositeGates = exports.deleteAlgorithm = exports.patchAlgorithm = exports.postAlgorithm = exports.getAllAlgorithms = exports.deleteGate = exports.patchGate = exports.postGate = exports.getUser = void 0;
exports.getGates = getGates;
exports.getCompositeGates = getCompositeGates;
var zod_1 = require("zod");
var gatesSchema = require("../schemas/gates.schema.js");
var algorithmSchema = require("../schemas/algorithm.schema.js");
var userServer = require("../servers/user/user.js");
var gatesServer = require("../servers/user/gates.js");
var algorithmsServer = require("../servers/user/algorithms.js");
function getAuth(req, res) {
    var provider = req.headers['provider'];
    var userId = req.headers['id'];
    if (!provider || !userId || typeof provider != 'string' || typeof userId != 'string') {
        res.status(400).json({
            message: 'provider, id are wrong',
            received: req.body
        });
        return null;
    }
    return [provider, userId];
}
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authResult, provider, userId, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                authResult = getAuth(req, res);
                if (!authResult)
                    return [2 /*return*/];
                provider = authResult[0], userId = authResult[1];
                return [4 /*yield*/, userServer.getUser(provider, userId)];
            case 1:
                user = _a.sent();
                res.json(user);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).json(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUser = getUser;
// Gates
function getGates(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var authResult, provider, userId, gates, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    authResult = getAuth(req, res);
                    if (!authResult)
                        return [2 /*return*/];
                    provider = authResult[0], userId = authResult[1];
                    return [4 /*yield*/, gatesServer.getUserGates(provider, userId)];
                case 1:
                    gates = _a.sent();
                    res.json(gates);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    res.status(500).json({ error: 'Error getting gates' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
;
var postGate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authResult, provider, userId, gates, gatesSchemaArray, result, canAdd, status_1, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                authResult = getAuth(req, res);
                if (!authResult)
                    return [2 /*return*/];
                provider = authResult[0], userId = authResult[1];
                gates = req.body.gates;
                gatesSchemaArray = zod_1.z.array(gatesSchema.CreateGateSchema);
                result = gatesSchemaArray.safeParse(gates);
                return [4 /*yield*/, userServer.canAddCustomGatesBulk(provider, userId, gates.length)];
            case 1:
                canAdd = _a.sent();
                if (!(canAdd && result.success)) return [3 /*break*/, 3];
                return [4 /*yield*/, gatesServer.upsertUserWithMultipleGates(provider, userId, gates)];
            case 2:
                status_1 = _a.sent();
                res.json(status_1);
                return [3 /*break*/, 4];
            case 3:
                res.status(500).json({ error: 'Error adding gates' });
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_3 = _a.sent();
                res.status(500).json({ error: 'Error adding gates' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.postGate = postGate;
var patchGate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authResult, provider, userId, gate, result, status_2, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                authResult = getAuth(req, res);
                if (!authResult)
                    return [2 /*return*/];
                provider = authResult[0], userId = authResult[1];
                gate = req.body;
                result = gatesSchema.UpdateGateSchema.safeParse(gate);
                if (!result.success) return [3 /*break*/, 3];
                return [4 /*yield*/, userServer.getUser(provider, userId)];
            case 1:
                _a.sent();
                return [4 /*yield*/, gatesServer.updateUserGate(provider, userId, gate)];
            case 2:
                status_2 = _a.sent();
                res.json(status_2);
                return [3 /*break*/, 4];
            case 3:
                res.status(500).json({ error: 'Error adding gates' });
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_4 = _a.sent();
                res.status(500).json({ error: 'Error updating gates' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.patchGate = patchGate;
var deleteGate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authResult, provider, userId, gateId, result, status_3, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                authResult = getAuth(req, res);
                if (!authResult)
                    return [2 /*return*/];
                provider = authResult[0], userId = authResult[1];
                gateId = req.body.id;
                result = gatesSchema.DeleteGateSchema.safeParse(gateId);
                if (!result.success) return [3 /*break*/, 3];
                return [4 /*yield*/, userServer.getUser(provider, userId)];
            case 1:
                _a.sent();
                return [4 /*yield*/, gatesServer.deleteUserGate(provider, userId, gateId)];
            case 2:
                status_3 = _a.sent();
                res.json(status_3);
                return [3 /*break*/, 4];
            case 3:
                res.status(500).json({ error: 'Error adding gates' });
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_5 = _a.sent();
                res.status(500).json({ error: 'Error deleting gates' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.deleteGate = deleteGate;
// Algorithms
var getAllAlgorithms = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authResult, provider, userId, algorithms, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                authResult = getAuth(req, res);
                if (!authResult)
                    return [2 /*return*/];
                provider = authResult[0], userId = authResult[1];
                return [4 /*yield*/, algorithmsServer.getUserAlgorithms(provider, userId)];
            case 1:
                algorithms = _a.sent();
                res.json(algorithms);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                res.status(500).json({ error: 'Error getting algorithms' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllAlgorithms = getAllAlgorithms;
var postAlgorithm = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authResult, provider, userId, algorithm, result, canAdd, status_4, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                authResult = getAuth(req, res);
                if (!authResult)
                    return [2 /*return*/];
                provider = authResult[0], userId = authResult[1];
                algorithm = req.body;
                result = algorithmSchema.CreateAlgorithmSchema.safeParse(algorithm);
                return [4 /*yield*/, userServer.canAddCustomAlgorithm(provider, userId)];
            case 1:
                canAdd = _a.sent();
                if (!(canAdd && result.success)) return [3 /*break*/, 3];
                return [4 /*yield*/, algorithmsServer.upsertUserWithAlgorithm(provider, userId, algorithm)];
            case 2:
                status_4 = _a.sent();
                res.json(status_4);
                return [3 /*break*/, 4];
            case 3:
                res.status(500).json({ error: 'Error adding gates' });
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_7 = _a.sent();
                res.status(500).json({ error: 'Error adding algorithm' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.postAlgorithm = postAlgorithm;
var patchAlgorithm = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authResult, provider, userId, algorithm, result, status_5, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                authResult = getAuth(req, res);
                if (!authResult)
                    return [2 /*return*/];
                provider = authResult[0], userId = authResult[1];
                algorithm = req.body;
                result = algorithmSchema.UpdateAlgorithmSchema.safeParse(algorithm);
                if (!result.success) return [3 /*break*/, 3];
                return [4 /*yield*/, userServer.getUser(provider, userId)];
            case 1:
                _a.sent();
                return [4 /*yield*/, algorithmsServer.updateUserAlgorithm(provider, userId, algorithm)];
            case 2:
                status_5 = _a.sent();
                res.json(status_5);
                return [3 /*break*/, 4];
            case 3:
                res.status(500).json({ error: 'Error adding gates' });
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_8 = _a.sent();
                res.status(500).json({ error: 'Error updating algorithm' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.patchAlgorithm = patchAlgorithm;
var deleteAlgorithm = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authResult, provider, userId, algorithmId, result, status_6, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                authResult = getAuth(req, res);
                if (!authResult)
                    return [2 /*return*/];
                provider = authResult[0], userId = authResult[1];
                algorithmId = req.body.id;
                result = algorithmSchema.DeleteAlgorithmSchema.safeParse(algorithmId);
                if (!result.success) return [3 /*break*/, 3];
                return [4 /*yield*/, userServer.getUser(provider, userId)];
            case 1:
                _a.sent();
                return [4 /*yield*/, algorithmsServer.deleteUserAlgorithm(provider, userId, algorithmId)];
            case 2:
                status_6 = _a.sent();
                res.json(status_6);
                return [3 /*break*/, 4];
            case 3:
                res.status(500).json({ error: 'Error adding gates' });
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_9 = _a.sent();
                res.status(500).json({ error: 'Error deleting algorithm' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.deleteAlgorithm = deleteAlgorithm;
// CompositeGates
function getCompositeGates(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var authResult, provider, userId, gates, error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    authResult = getAuth(req, res);
                    if (!authResult)
                        return [2 /*return*/];
                    provider = authResult[0], userId = authResult[1];
                    return [4 /*yield*/, gatesServer.getCompositeGates(provider, userId)];
                case 1:
                    gates = _a.sent();
                    res.json(gates);
                    return [3 /*break*/, 3];
                case 2:
                    error_10 = _a.sent();
                    res.status(500).json({ error: 'Error getting composite gates' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
;
var postCompositeGates = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authResult, provider, userId, gates, gatesSchemaArray, result, status_7, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                authResult = getAuth(req, res);
                if (!authResult)
                    return [2 /*return*/];
                provider = authResult[0], userId = authResult[1];
                gates = req.body.gates;
                gatesSchemaArray = zod_1.z.array(gatesSchema.CreateCompositeGateSchema);
                result = gatesSchemaArray.safeParse(gates);
                if (!result.success) return [3 /*break*/, 3];
                return [4 /*yield*/, userServer.getUser(provider, userId)];
            case 1:
                _a.sent();
                return [4 /*yield*/, gatesServer.upsertUserWithMultipleCompositeGates(provider, userId, gates)];
            case 2:
                status_7 = _a.sent();
                res.json(status_7);
                return [3 /*break*/, 4];
            case 3:
                res.status(500).json({ error: 'Error adding gates' });
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_11 = _a.sent();
                res.status(500).json({ error: 'Error adding composite gates' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.postCompositeGates = postCompositeGates;
var patchCompositeGates = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authResult, provider, userId, gate, result, status_8, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                authResult = getAuth(req, res);
                if (!authResult)
                    return [2 /*return*/];
                provider = authResult[0], userId = authResult[1];
                gate = req.body;
                result = gatesSchema.UpdateCompositeGateSchema.safeParse(gate);
                if (!result.success) return [3 /*break*/, 3];
                return [4 /*yield*/, userServer.getUser(provider, userId)];
            case 1:
                _a.sent();
                return [4 /*yield*/, gatesServer.updateCompositeGate(provider, userId, gate)];
            case 2:
                status_8 = _a.sent();
                res.json(status_8);
                return [3 /*break*/, 4];
            case 3:
                res.status(500).json({ error: 'Error adding gates' });
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_12 = _a.sent();
                res.status(500).json({ error: 'Error updating composite gates' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.patchCompositeGates = patchCompositeGates;
var deleteCompositeGates = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authResult, provider, userId, gateId, result, status_9, error_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                authResult = getAuth(req, res);
                if (!authResult)
                    return [2 /*return*/];
                provider = authResult[0], userId = authResult[1];
                gateId = req.body.id;
                result = gatesSchema.DeleteCompositeGateSchema.safeParse(gateId);
                if (!result.success) return [3 /*break*/, 3];
                return [4 /*yield*/, userServer.getUser(provider, userId)];
            case 1:
                _a.sent();
                return [4 /*yield*/, gatesServer.deleteCompositeGate(provider, userId, gateId)];
            case 2:
                status_9 = _a.sent();
                res.json(status_9);
                return [3 /*break*/, 4];
            case 3:
                res.status(500).json({ error: 'Error adding gates' });
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_13 = _a.sent();
                res.status(500).json({ error: 'Error deleting composite gates' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.deleteCompositeGates = deleteCompositeGates;
