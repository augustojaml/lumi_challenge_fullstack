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

// src/shared/core/errors/client-already-exists-error.ts
var client_already_exists_error_exports = {};
__export(client_already_exists_error_exports, {
  ClientAlreadyExistsError: () => ClientAlreadyExistsError
});
module.exports = __toCommonJS(client_already_exists_error_exports);

// src/shared/core/errors/app-error.ts
var AppError = class extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";
    Error.captureStackTrace(this, this.constructor);
  }
};

// src/shared/core/errors/client-already-exists-error.ts
var ClientAlreadyExistsError = class extends AppError {
  constructor() {
    super("Client already exists", 409);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ClientAlreadyExistsError
});
