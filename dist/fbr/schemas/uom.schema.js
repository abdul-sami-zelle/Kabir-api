"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UOMSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UOMSchema = new mongoose_1.Schema({
    uoM_ID: { type: Number, required: true, unique: true },
    description: { type: String, required: true },
});
//# sourceMappingURL=uom.schema.js.map