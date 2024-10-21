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

// src/shared/http/middleware/erros-handler.ts
var erros_handler_exports = {};
__export(erros_handler_exports, {
  errosHandlers: () => errosHandlers
});
module.exports = __toCommonJS(erros_handler_exports);

// src/shared/core/errors/app-error.ts
var AppError = class extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";
    Error.captureStackTrace(this, this.constructor);
  }
};

// src/shared/http/middleware/erros-handler.ts
var import_process = require("process");
var import_zod = require("zod");
var errosHandlers = async (app) => {
  app.setErrorHandler((error, _, reply) => {
    if (error instanceof import_zod.ZodError) {
      return reply.status(400).send({
        message: "Validation error.",
        issues: error.format()
      });
    }
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        message: error.message
      });
    }
    if (import_process.env.NODE_ENV !== "production") {
      console.error(`\u274C ${error}`);
    } else {
    }
    return reply.status(500).send({
      message: "Internal server error."
    });
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  errosHandlers
});
