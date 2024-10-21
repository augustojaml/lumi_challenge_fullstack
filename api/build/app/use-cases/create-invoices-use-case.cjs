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

// src/app/use-cases/create-invoices-use-case.ts
var create_invoices_use_case_exports = {};
__export(create_invoices_use_case_exports, {
  CreateInvoicesUseCase: () => CreateInvoicesUseCase
});
module.exports = __toCommonJS(create_invoices_use_case_exports);

// src/shared/core/errors/app-error.ts
var AppError = class extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";
    Error.captureStackTrace(this, this.constructor);
  }
};

// src/shared/core/errors/resource-not-found-error.ts
var ResourceNotFoundError = class extends AppError {
  constructor() {
    super("Resource not found", 404);
  }
};

// src/app/use-cases/create-invoices-use-case.ts
var CreateInvoicesUseCase = class {
  constructor(clientsRepository, invoicesRepository) {
    this.clientsRepository = clientsRepository;
    this.invoicesRepository = invoicesRepository;
  }
  async execute(data) {
    const client = await this.clientsRepository.findById(data.client_id);
    if (!client) {
      throw new ResourceNotFoundError();
    }
    const createdInvoice = {
      ...data.invoice,
      client_id: data.client_id,
      client_number: client.client_number ?? 0
    };
    const invoice = await this.invoicesRepository.create(createdInvoice);
    return { invoice };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateInvoicesUseCase
});
