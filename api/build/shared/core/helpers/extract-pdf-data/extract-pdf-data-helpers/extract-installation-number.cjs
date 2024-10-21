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

// src/shared/core/helpers/extract-pdf-data/extract-pdf-data-helpers/extract-installation-number.ts
var extract_installation_number_exports = {};
__export(extract_installation_number_exports, {
  extractInstallationNumber: () => extractInstallationNumber
});
module.exports = __toCommonJS(extract_installation_number_exports);
var extractInstallationNumber = (text) => {
  const lines = text.split("\n");
  const index = lines.findIndex((line) => line.includes("N\xBA DA INSTALA\xC7\xC3O"));
  if (index !== -1 && lines.length > index + 1) {
    const nextLine = lines[index + 1];
    const parts = nextLine.trim().split(/\s+/);
    const installationNumber = parts[parts.length - 1];
    return installationNumber || null;
  }
  return null;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  extractInstallationNumber
});
