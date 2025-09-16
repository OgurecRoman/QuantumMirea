"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCompositeGateSchema = exports.UpdateCompositeGateSchema = exports.CreateCompositeGateSchema = exports.DeleteGateSchema = exports.UpdateGateSchema = exports.CreateGateSchema = void 0;
var zod_1 = require("zod");
exports.CreateGateSchema = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    complexOneOne: zod_1.z.number(),
    complexOneTwo: zod_1.z.number(),
    complexTwoOne: zod_1.z.number(),
    complexTwoTwo: zod_1.z.number(),
    complexThreeOne: zod_1.z.number(),
    complexThreeTwo: zod_1.z.number(),
    complexFourOne: zod_1.z.number(),
    complexFourTwo: zod_1.z.number(),
});
exports.UpdateGateSchema = zod_1.z.object({
    id: zod_1.z.number(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    complexOneOne: zod_1.z.number(),
    complexOneTwo: zod_1.z.number(),
    complexTwoOne: zod_1.z.number(),
    complexTwoTwo: zod_1.z.number(),
    complexThreeOne: zod_1.z.number(),
    complexThreeTwo: zod_1.z.number(),
    complexFourOne: zod_1.z.number(),
    complexFourTwo: zod_1.z.number(),
});
exports.DeleteGateSchema = zod_1.z.object({
    id: zod_1.z.number(),
});
exports.CreateCompositeGateSchema = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    gates: zod_1.z.object(),
});
exports.UpdateCompositeGateSchema = zod_1.z.object({
    id: zod_1.z.number(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    gates: zod_1.z.object(),
    authorId: zod_1.z.number(),
});
exports.DeleteCompositeGateSchema = zod_1.z.object({
    id: zod_1.z.number(),
});
