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

// src/app/use-cases/upload-pdf-invoice-use-case.ts
var upload_pdf_invoice_use_case_exports = {};
__export(upload_pdf_invoice_use_case_exports, {
  UploadPdfInvoicesUseCase: () => UploadPdfInvoicesUseCase
});
module.exports = __toCommonJS(upload_pdf_invoice_use_case_exports);
var UploadPdfInvoicesUseCase = class {
  constructor(clientsRepository, invoicesRepository) {
    this.clientsRepository = clientsRepository;
    this.invoicesRepository = invoicesRepository;
  }
  async execute({ invoices }) {
    const createdInvoices = [];
    const invoicesWithoutClient = [];
    for (const invoice of invoices) {
      const client = await this.clientsRepository.findByClient(
        invoice.client_number
      );
      if (client) {
        const createdInvoice = await this.invoicesRepository.create({
          ...invoice,
          client_number: client.client_number ?? "",
          client_id: client.id
        });
        createdInvoices.push(createdInvoice);
      } else {
        invoicesWithoutClient.push(invoice);
      }
    }
    return { createdInvoices, invoicesWithoutClient };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UploadPdfInvoicesUseCase
});
