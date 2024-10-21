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

// src/shared/core/schemas/create-client-schema.ts
var create_client_schema_exports = {};
__export(create_client_schema_exports, {
  createClientSchema: () => createClientSchema
});
module.exports = __toCommonJS(create_client_schema_exports);
var import_zod = require("zod");
var createClientSchema = import_zod.z.object({
  client_number: import_zod.z.string(),
  full_name: import_zod.z.string(),
  hash_password: import_zod.z.string().min(6, { message: "Password must be at least 6 characters long" }).max(8, { message: "Password must be at most 8 characters long" }),
  email: import_zod.z.string().email(),
  role: import_zod.z.enum(["USER", "ADMIN"]),
  street: import_zod.z.string(),
  number: import_zod.z.string(),
  complement: import_zod.z.string().optional(),
  neighborhood: import_zod.z.string(),
  zip_code: import_zod.z.string().regex(/^\d{5}-\d{3}$/),
  city: import_zod.z.string(),
  state: import_zod.z.string().length(2),
  tax_id: import_zod.z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/),
  state_registration: import_zod.z.string(),
  invoices: import_zod.z.array(import_zod.z.any()).optional().nullable()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createClientSchema
});
