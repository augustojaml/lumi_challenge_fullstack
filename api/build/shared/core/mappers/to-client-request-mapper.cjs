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

// src/shared/core/mappers/to-client-request-mapper.ts
var to_client_request_mapper_exports = {};
__export(to_client_request_mapper_exports, {
  toClientRequestMapper: () => toClientRequestMapper
});
module.exports = __toCommonJS(to_client_request_mapper_exports);
var toClientRequestMapper = (client) => {
  return {
    id: client.id,
    full_name: client.full_name,
    email: client.email,
    role: client.role,
    street: client.street,
    number: client.number,
    complement: client.complement,
    neighborhood: client.neighborhood,
    zip_code: client.zip_code,
    city: client.city,
    state: client.state,
    taxId: client.tax_id,
    state_registration: client.state_registration
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  toClientRequestMapper
});
