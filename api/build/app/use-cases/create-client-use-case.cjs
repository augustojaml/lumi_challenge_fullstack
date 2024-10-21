"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/app/use-cases/create-client-use-case.ts
var create_client_use_case_exports = {};
__export(create_client_use_case_exports, {
  CreateClientUseCase: () => CreateClientUseCase
});
module.exports = __toCommonJS(create_client_use_case_exports);

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

// src/shared/core/helpers/password-helper.ts
var import_bcryptjs = __toESM(require("bcryptjs"), 1);
var passwordHelper = {
  hash: async (password, salt = 6) => {
    const hashPassword = await import_bcryptjs.default.hash(password, salt);
    return hashPassword;
  },
  compare: async (password, hash) => {
    const comparePassword = await import_bcryptjs.default.compare(password, hash);
    return comparePassword;
  }
};

// src/app/use-cases/create-client-use-case.ts
var CreateClientUseCase = class {
  constructor(clientsRepository) {
    this.clientsRepository = clientsRepository;
  }
  async execute(data) {
    const findClient = await this.clientsRepository.findByEmail(data.email);
    if (findClient) {
      throw new ClientAlreadyExistsError();
    }
    const hashPassword = await passwordHelper.hash(data.hash_password);
    const client = await this.clientsRepository.create({
      ...data,
      hash_password: hashPassword
    });
    return { client };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateClientUseCase
});
