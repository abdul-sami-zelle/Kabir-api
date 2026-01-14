"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HSCodeSchema = void 0;
const mongoose_1 = require("mongoose");
exports.HSCodeSchema = new mongoose_1.Schema({
    hS_CODE: { type: String, required: true, unique: true },
    description: { type: String, required: true },
});
//# sourceMappingURL=hs-codes.schema.js.map