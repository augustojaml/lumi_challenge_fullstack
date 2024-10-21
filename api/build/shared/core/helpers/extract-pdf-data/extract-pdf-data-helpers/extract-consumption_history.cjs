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

// src/shared/core/helpers/extract-pdf-data/extract-pdf-data-helpers/extract-consumption_history.ts
var extract_consumption_history_exports = {};
__export(extract_consumption_history_exports, {
  extractConsumptionHistory: () => extractConsumptionHistory
});
module.exports = __toCommonJS(extract_consumption_history_exports);
var extractConsumptionHistory = (text) => {
  const lines = text.split("\n");
  const startIndex = lines.findIndex(
    (line) => line.includes("Hist\xF3rico de Consumo")
  );
  if (startIndex === -1) {
    return [];
  }
  const headerIndex = startIndex + 1;
  const dataLines = [];
  for (let i = headerIndex + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "" || line.includes("Reservado ao Fisco") || line.includes("SEM VALOR FISCAL")) {
      break;
    }
    dataLines.push(line);
  }
  const items = [];
  for (const line of dataLines) {
    const item = parseLine(line);
    if (item) {
      items.push(item);
    }
  }
  return items;
};
var parseLine = (line) => {
  const cleanedLine = line.trim().replace(/\s+/g, " ");
  const parts = cleanedLine.split(" ");
  if (parts.length >= 4) {
    const item = {
      month_year: parts[0],
      consumption_kwh: parseNumber(parts[1]),
      average_kwh_per_day: parseNumber(parts[2]),
      days: parseInt(parts[3], 10)
    };
    return item;
  }
  return null;
};
var parseNumber = (str) => {
  const cleanedStr = str.replace(/\./g, "").replace(/\s/g, "").replace(",", ".");
  const num = parseFloat(cleanedStr);
  return isNaN(num) ? 0 : num;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  extractConsumptionHistory
});
