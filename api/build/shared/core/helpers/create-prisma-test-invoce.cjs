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

// src/shared/core/helpers/create-prisma-test-invoce.ts
var create_prisma_test_invoce_exports = {};
__export(create_prisma_test_invoce_exports, {
  createTestInvoice: () => createTestInvoice
});
module.exports = __toCommonJS(create_prisma_test_invoce_exports);
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var createTestInvoice = async (data) => {
  return await prisma.invoice.create({
    data: {
      file_name: data.file_name,
      client: {
        connect: {
          id: data.client_id
        }
      },
      client_number: data.client_number,
      reference_month: data.reference_month,
      due_date: new Date(data.due_date),
      installation_number: data.installation_number,
      amount_due: data.amount_due,
      billed_items: {
        create: data.billed_items
      },
      consumption_history: {
        create: data.consumption_history
      }
    }
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createTestInvoice
});
