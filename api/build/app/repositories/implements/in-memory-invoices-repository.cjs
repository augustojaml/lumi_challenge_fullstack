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

// src/app/repositories/implements/in-memory-invoices-repository.ts
var in_memory_invoices_repository_exports = {};
__export(in_memory_invoices_repository_exports, {
  InMemoryInvoicesRepository: () => InMemoryInvoicesRepository
});
module.exports = __toCommonJS(in_memory_invoices_repository_exports);
var import_uuid = require("uuid");
var InMemoryInvoicesRepository = class {
  constructor() {
    this.invoices = [];
  }
  async create(data) {
    const newInvoice = {
      id: (0, import_uuid.v4)(),
      file_name: data.file_name,
      client_id: data.client_id,
      client_number: data.client_number,
      reference_month: data.reference_month,
      due_date: new Date(data.due_date),
      installation_number: data.installation_number,
      amount_due: data.amount_due
    };
    this.invoices.push(newInvoice);
    return newInvoice;
  }
  async findById(id) {
    const invoice = this.invoices.find((invoice2) => invoice2.id === id);
    return invoice || null;
  }
  async findAll() {
    return this.invoices;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryInvoicesRepository
});
