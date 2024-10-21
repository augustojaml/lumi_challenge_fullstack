"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/shared/core/schemas/upload-file-schema.ts
var upload_file_schema_exports = {};
__export(upload_file_schema_exports, {
  uploadFileSchema: () => uploadFileSchema
});
module.exports = __toCommonJS(upload_file_schema_exports);
var import_zod = require("zod");
var billedItemSchema = import_zod.z.object({
  item_name: import_zod.z.string(),
  unit: import_zod.z.string(),
  quantity: import_zod.z.number(),
  unit_price: import_zod.z.number(),
  amount: import_zod.z.number(),
  unit_rate: import_zod.z.number()
});
var consumptionHistorySchema = import_zod.z.object({
  month_year: import_zod.z.string(),
  consumption_kwh: import_zod.z.number(),
  average_kwh_per_day: import_zod.z.number(),
  days: import_zod.z.number()
});
var uploadFileSchema = import_zod.z.array(
  import_zod.z.object({
    file_name: import_zod.z.string(),
    client_number: import_zod.z.string(),
    reference_month: import_zod.z.string(),
    due_date: import_zod.z.string().transform((date) => new Date(date)),
    installation_number: import_zod.z.string(),
    amount_due: import_zod.z.preprocess((val) => parseFloat(val), import_zod.z.number()),
    billed_items: import_zod.z.array(billedItemSchema),
    consumption_history: import_zod.z.array(consumptionHistorySchema)
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  uploadFileSchema
});
