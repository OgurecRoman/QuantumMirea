"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAlgorithmSchema = exports.UpdateAlgorithmSchema = exports.CreateAlgorithmSchema = void 0;
var zod_1 = require("zod");
exports.CreateAlgorithmSchema = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    qubit: zod_1.z.number(),
    column: zod_1.z.number(),
    data: zod_1.z.object(),
});
exports.UpdateAlgorithmSchema = zod_1.z.object({
    id: zod_1.z.number(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    qubit: zod_1.z.number(),
    column: zod_1.z.number(),
    data: zod_1.z.object(),
});
exports.DeleteAlgorithmSchema = zod_1.z.object({
    id: zod_1.z.number(),
});
