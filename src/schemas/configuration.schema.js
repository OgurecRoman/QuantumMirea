"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationSchema = void 0;
var zod_1 = require("zod");
var client_1 = require("@prisma/client");
exports.ConfigurationSchema = zod_1.z.object({
    id: zod_1.z.string(),
    job: zod_1.z.nativeEnum(client_1.JobsType),
});
