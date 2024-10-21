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

// src/app/use-cases/find-all-clients-use-case.ts
var find_all_clients_use_case_exports = {};
__export(find_all_clients_use_case_exports, {
  FindAllClientsUseCase: () => FindAllClientsUseCase
});
module.exports = __toCommonJS(find_all_clients_use_case_exports);
var FindAllClientsUseCase = class {
  constructor(clientsRepository) {
    this.clientsRepository = clientsRepository;
  }
  async execute() {
    const clients = await this.clientsRepository.findAll();
    return { clients };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FindAllClientsUseCase
});
