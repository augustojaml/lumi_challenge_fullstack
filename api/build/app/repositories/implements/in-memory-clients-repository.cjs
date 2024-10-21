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

// src/app/repositories/implements/in-memory-clients-repository.ts
var in_memory_clients_repository_exports = {};
__export(in_memory_clients_repository_exports, {
  InMemoryClientsRepository: () => InMemoryClientsRepository
});
module.exports = __toCommonJS(in_memory_clients_repository_exports);
var import_uuid = require("uuid");
var InMemoryClientsRepository = class {
  constructor() {
    this.items = [];
  }
  async create(data) {
    const client = {
      id: (0, import_uuid.v4)(),
      ...data
    };
    this.items.push(client);
    return client;
  }
  async findById(id) {
    const client = this.items.find((item) => item.id === id);
    return client || null;
  }
  async findByEmail(email) {
    const client = this.items.find((item) => item.email === email);
    return client || null;
  }
  async findByClient(client_number) {
    const client = this.items.find(
      (item) => item.client_number === client_number
    );
    return client || null;
  }
  async findAll() {
    return this.items;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryClientsRepository
});
