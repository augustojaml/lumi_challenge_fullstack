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

// src/shared/core/libs/prisma/vitest-environment-prisma/prisma-test-environment.ts
var prisma_test_environment_exports = {};
__export(prisma_test_environment_exports, {
  default: () => prisma_test_environment_default
});
module.exports = __toCommonJS(prisma_test_environment_exports);
var import_config = require("dotenv/config");
var import_node_crypto = require("crypto");
var import_node_child_process = require("child_process");
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var generateDataBaseURL = (schema) => {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "Please provide a DATABASE_URL environment variable inside .env file"
    );
  }
  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set("schema", schema);
  return url.toString();
};
var prisma_test_environment_default = {
  name: "prisma",
  async setup() {
    const schema = (0, import_node_crypto.randomUUID)();
    process.env.DATABASE_URL = generateDataBaseURL(schema);
    (0, import_node_child_process.execSync)("npx prisma migrate deploy");
    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
        );
        await prisma.$disconnect();
      }
    };
  },
  transformMode: "ssr"
};
